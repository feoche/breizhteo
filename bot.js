import Twitter from 'twitter';
import minimist from 'minimist';
import cp from 'child_process';
import request from 'request';
import moment from 'moment';
import {data} from './data.js';

// Retrieve args
const args = minimist(process.argv.slice(2));
let dataItems = [];
let copy = cp.spawn('pbcopy');

// create an object using the keys we just determined
const twitterAPI = new Twitter({
  consumer_key: process.env.CONSUMER_TOKEN || args.consumer_key,
  consumer_secret: process.env.CONSUMER_SECRET || args.consumer_secret,
  access_token_key: process.env.ACCESS_TOKEN_KEY || args.access_token_key,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || args.access_token_secret
});

init();

function init() {
  console.log(`Started`);
  const time = moment().format('YYYYMMDD') + ('00' + (data.HOURS.filter(a => a.time >= moment().get('hours'))[0] || data.HOURS[0]).time).substr(-2, 2);

  // http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=201807260000&nightMode=true
  queryWeather(`http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=${time}00`).then(res => {
    queryWeather(`http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/plages/RIVAGE/MER002?echeance=${time}00`).then(res2 => {

      console.info("dataItems : ", dataItems);

      tweet(`Prévisions pour ${res}:
      ${textToWeather('temperatureMer')}
      `);
     });
  });
}

function tweet(text) {
  console.info(text);
  copy.stdin.write(text);
  copy.stdin.end();
  if (!args.test) { // TWEET
    twitterAPI.post('statuses/update', {
        status: text.substring(0, 280)
      },
      error => console.error('Error: ', error)
    );
  }
}

let concatAndDeDuplicateObjectsDeep = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a));

function queryWeather(url) {
  console.info('url : ', url);
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
        console.error('Error: ', error);
      }
      console.info("JSON.parse(body).previsionLieux : ", JSON.parse(body).previsionLieux);
      dataItems = concatAndDeDuplicateObjectsDeep('slug', dataItems, JSON.parse(body).previsionLieux
        .map(a => ({
          'slug': a.lieu.slug,
          'pictoTemps': a.prevision.pictoTemps,
          'temperature': a.prevision.temperature,
          'temperatureMer': a.prevision.temperatureMer,
          'pictoVent': a.prevision.pictoVent,
          'forceVent': a.prevision.forceDuVentMoyenne
        }))
        .filter(a => data.DATACITIES.includes(a.slug) && a.temperature))
      ;

      // console.info('dataItems : ', dataItems);
      resolve((data.HOURS.filter(a => a.time >= moment().get('hours'))[0] || data.HOURS[0]).label);
    });
  });
}

function weather(index) {
  console.info("dataItems[index] : ", dataItems[index]);
  console.info('dataItems.filter(a,i => i === dataItems[index]) : ', dataItems.filter(a => a.slug === data.DATACITIES[index]));
  return dataItems.filter(a => a.slug === data.DATACITIES[index])[0];
}

function textToWeather(type) {
  let index = 0, previousSpace = false;
  return data.MAP.split('').map(a => {
    switch(a) {
      case '#':
      case 'w':
        let point, wcity = weather(index)[type];
        switch (type) {
          case 'temperature' :
          case 'temperatureMer' :
            if(wcity > -1) {
              point = '';
              if (previousSpace) {
                previousSpace = false;
              }
              else {
                point += '\u2003';
              }
              point += ('' + wcity).replace(/\w/g, a => data.SMALL_LETTERS[a]);
            }
            else {
              point = '🌊';
            }
            break;
          case 'pictoVent' :
            const wforce = weather(index)['forceVent'].replace(/[\s<]/g, '').padStart(2, "0");
            const emoji = data.WINDS.filter(a => a.codes.includes(wcity))[0].emojis;
            point = emoji[Math.min(emoji.length-1, Math.max(0, Math.floor(wforce[0]) - 1))];
            break;
          case 'pictoTemps' :
          default:
            point = data.WEATHER.filter(a => a.codes.includes(wcity))[0].emojis[0];
            break;
        }
        index++;
        return point;

      default : // the char is a space char
        previousSpace = true;
        return a;
    }
  }).join('');
}