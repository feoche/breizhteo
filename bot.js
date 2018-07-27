import Twitter from 'twitter';
import minimist from 'minimist';
import request from 'request';
import moment from 'moment';
import {data} from './data.js';

// Retrieve args
const args = minimist(process.argv.slice(2));
let dataItems = [];

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
  queryWeather().then(res => {
    console.info('prevision : ', data);
    tweet(`Prévisions pour ${res}:
    ${textToWeather('pictoTemps')}
    `);
  });
}

function tweet(text) {
  console.info(text);
  if (!args.test) { // TWEET
    twitterAPI.post('statuses/update', {
        status: text.substring(0, 280)
      },
      error => console.error('Error: ', error)
    );
  }
}

function queryWeather() {
  // http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=201807260000&nightMode=true
  const url = `http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=${moment().format('YYYYMMDD') + ('00' + (data.HOURS.filter(a => a.time>=moment().get('hours'))[0] || data.HOURS[0]).time).substr(-2,2)}00`;
  console.info('url : ', url);
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
        console.error('Error: ', error);
      }
      dataItems = JSON.parse(body).previsionLieux
        .map(a => ({
          'slug': a.lieu.slug,
          'x': a.lieu.positionAffichageCarteX,
          'y': a.lieu.positionAffichageCarteY,
          'pictoTemps': a.prevision.pictoTemps,
          'temperature': a.prevision.temperature,
          'pictoVent': a.prevision.pictoVent
        }))
        .filter(a => data.DATACITIES.includes(a.slug) && a.temperature)
      ;

      // console.info('dataItems : ', dataItems);
      resolve((data.HOURS.filter(a => a.time>=moment().get('hours'))[0] || data.HOURS[0]).label);
    });
  });
}

function weather(index) {
  console.info("index : ", index);
  console.info('dataItems.filter(a,i => i === dataItems[index]) : ', dataItems.filter(a => a.slug === data.DATACITIES[index]));
  return dataItems.filter(a => a.slug === data.DATACITIES[index])[0];
}

function textToWeather(type) {
  let index = 0;
  return data.MAP.split('').map(a => {
    if(a === '#') {
      const w = data.WEATHER.filter(a => a.codes.includes(weather(index)[type]))[0].emoji;
      index++;
      return w;
    }
    else {
      return a;
    }
  }).join('');
}