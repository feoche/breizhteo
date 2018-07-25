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
    request('http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=201807260000', (error, response, body) => {
        if(error) {
            console.error('Error: ', error);
        }
        console.log('body:', body.previsionLieux);
        let items = response.previsionLieux.sort((a,b) => {
            const ay = a.lieu.positionAffichageCarteY,
                by = b.lieu.a.lieu.positionAffichageCarteY,
                ax = a.lieu.positionAffichageCarteX,
                bx = b.lieu.a.lieu.positionAffichageCarteX;
            if(ay < by && ax < bx) {
                return -1;
            }
            return 0;
        });
    });

    let weather = ['☀'];

    let forecastTime = moment().format('YYYYMMDDhh00');

    let map = `
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}${weather[0]}
${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}
\xa0\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}
${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}${weather[0]}${weather[0]}${weather[0]}
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0${weather[0]}${weather[0]}${weather[0]}
    `;

    tweet(map);
}

