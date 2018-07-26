import Twitter from 'twitter';
import minimist from 'minimist';
import request from 'request';
import moment from 'moment';
import {data} from './data.js';

// Retrieve args
const args = minimist(process.argv.slice(2));

// create an object using the keys we just determined
const twitterAPI = new Twitter({
  consumer_key: process.env.CONSUMER_TOKEN || args.consumer_key,
  consumer_secret: process.env.CONSUMER_SECRET || args.consumer_secret,
  access_token_key: process.env.ACCESS_TOKEN_KEY || args.access_token_key,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || args.access_token_secret
});

console.log(`Logged in`);
init();

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


function init() {
  // http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=201807260000&nightMode=true
  const url = 'http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=' + moment().add(3, 'hours').format('YYYYMMDDkk00');
  console.info("url : ", url);
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error: ', error);
    }
    const items = JSON.parse(body).previsionLieux
      .map(a => {
        return {
          "x": a.lieu.positionAffichageCarteX,
          "y": a.lieu.positionAffichageCarteY,
          "pictoTemps": a.prevision.pictoTemps,
          "temperature": a.prevision.temperature,
          "pictoVent": a.prevision.pictoVent
        }
      })
      .filter(a => a.x > data.BOUNDS.x.min && a.x < data.BOUNDS.x.max && a.y > data.BOUNDS.y.min && a.y < data.BOUNDS.y.max)
      .sort((a, b) => (a.y < (b.y + 50) && a.x < b.x) ? -1 : 1)
    ;

    console.info("items : ", items);
  });

  tweet(data.MAP.replace(/#/g, data.WEATHER["J_W1_0-N_0"]));
}

