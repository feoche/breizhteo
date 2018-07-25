# What is it?
Just a Twitter bot

# Configure a Twitter bot
Begin by opening a new account for the bot on Twitter. Then, create an application for this account on [dev.twitter.com](http://dev.twitter.com), and get the API keys.

# Add Twitter API keys as env variables in 'Settings'
```
consumer_key: "YOUR_CONSUMER_TOKEN",
consumer_secret: "YOUR_CONSUMER_SECRET",
access_token_key: "YOUR_ACCESS_TOKEN_KEY",
access_token_secret: "YOUR_ACCESS_TOKEN_SECRET"
```
3) Deploy & Run using `node bot.js` command

# What if I want to test it locally?
You can launch this command locally: `npm start -- --test --consumer_key <CONSUMER_TOKEN> --consumer_secret <CONSUMER_SECRET> --access_token_key <ACCESS_TOKEN_KEY> --access_token_secret <ACCESS_TOKEN_SECRET>`
