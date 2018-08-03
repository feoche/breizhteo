import Twitter from 'twitter';
import minimist from 'minimist';
import puppeteer from 'puppeteer';
import clipboardy from 'clipboardy';
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

function init() {
  console.log(`Started`);
  const time = moment().format('YYYYMMDD') + ('00' + (data.HOURS.filter(a => a.time >= moment().get('hours'))[0] || data.HOURS[0]).time).substr(-2, 2);

  queryWeather(data.URLS[0].replace(/\$time\$/g, time)).then(res => {
    queryWeather(data.URLS[1].replace(/\$time\$/g, time)).then(() => {
      // console.info('dataItems : ', dataItems);

      tweet(`Prévisions pour ${res}:
      ${textToWeather('pictoTemps')}
      ${textToWeather('temperature')}
      ${textToWeather('pictoVent')}
      ${textToWeather('temperatureMer')}
      `);

      /*async () => {
        console.info('fjrn : ', fjrn);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://twitter.com/login');
        await page.screenshot({path: 'google.png'});

        await browser.close();
      }*/
    });
  });
}
init();

function tweet(text) {
  console.info(text);
  clipboardy.writeSync(text);
  clipboardy.readSync();
  if (!args.test) { // TWEET
    twitterAPI.post('statuses/update', {
        status: text.substring(0, 280)
      },
      error => console.error('Error: ', error)
    );
  }
}

function mergeArrays(arr1, arr2) {
  let res = [];
  for (let i = 0; i < arr1.length; i++) {
    let found = false;
    const a = arr1[i];
    for (let j = 0; j < arr2.length; j++) {
      const b = arr2[j];
      if (a.slug === b.slug) {
        found = true;
        res.push({
          slug: a.slug,
          pictoTemps: a.pictoTemps,
          temperature: Math.max(a.temperature, b.temperature),
          temperatureMer: Math.max(a.temperatureMer, b.temperatureMer),
          pictoVent: a.pictoVent,
          forceVent: Math.max(a.forceVent, b.forceVent)
        })
      }
    }
    if (!found) {
      res.push(a);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    let found = false;
    let a = arr2[i];
    for (let j = 0; j < arr1.length; j++) {
      let b = arr1[j];
      if (b.slug === a.slug) {
        found = true;
      }
    }
    if (!found) {
      res.push(arr2[i]);
    }
  }
  return res;
}

function queryWeather(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
        console.error('Error: ', error);
      }
      else {
        const formattedResponse = JSON.parse(body).previsionLieux
          .map(a => ({
            slug: a.lieu.slug,
            pictoTemps: a.prevision.pictoTemps,
            temperature: a.prevision.temperature,
            temperatureMer: a.prevision.temperatureMer,
            pictoVent: a.prevision.pictoVent,
            forceVent: a.prevision.forceDuVentMoyenne
          }))
          .filter(a => data.DATACITIES.includes(a.slug) && a.temperature);

        dataItems = mergeArrays(formattedResponse, dataItems);

        // console.info('dataItems : ', dataItems);
        resolve((data.HOURS.filter(a => a.time >= moment().get('hours'))[0] || data.HOURS[0]).label);
      }
    });
  });
}

function weather(index) {
  if (dataItems.filter(a => a.slug === data.DATACITIES[index]).length) {
    console.info('data.DATACITIES[index] : ', data.DATACITIES[index]);
    console.info('dataItems.filter(a,i => i === dataItems[index]) : ', dataItems.filter(a => a.slug === data.DATACITIES[index]));
  }
  return dataItems.filter(a => a.slug === data.DATACITIES[index])[0];
}

function textToWeather(type) {
  let index = 0, previousSpace = false;
  return data.MAP.split('').map(char => {
    switch (char) {
      case '#':
      case 'w':
        let point = '',
          wcity = weather(index)[type];
        switch (type) {
          case 'temperature' :
            if (previousSpace) {
              previousSpace = false;
            } else {
              point += '\xa0';
            }
            point += ('' + wcity).replace(/\w/g, a => data.SMALL_LETTERS[a]);
            break;

          case 'temperatureMer' :
            if (previousSpace) {
              previousSpace = false;
            }
            if (wcity > -1) {
              console.info('weather(index) : ', weather(index));
              point += ('' + wcity).replace(/\w/g, a => data.SMALL_LETTERS[a]) +
                data.WEATHER.filter(a => (weather(index)['pictoTemps']).match(a.codes))[0].emojis[0];
            }
            else {
              point = char === 'w' ? '🌊' : '🏖';
            }
            break;
          case 'pictoVent' :
            const wforce = ('' + weather(index)['forceVent']).replace(/[\s<]/g, '').padStart(2, '0');
            const emoji = data.WINDS.filter(a => a.codes.includes(wcity))[0].emojis;
            point = emoji[Math.min(emoji.length - 1, Math.max(0, Math.floor(wforce[0]) - 1))];
            break;
          case 'pictoTemps' :
          default:
            console.info('wcity: ', index);
            point = data.WEATHER.filter(a => wcity.match(a.codes))[0].emojis[0];
            break;
        }
        index++;
        return point;
      case '_':
        previousSpace = true;
        return '\u2003';
      case '-':
        previousSpace = true;
        return '\u2002';
      default:
        previousSpace = true;
        return char;
    }
  }).join('');
}
