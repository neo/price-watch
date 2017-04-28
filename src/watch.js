const jsdom = require('jsdom');
const request = require('request');
const fetch = require('./fetch');
const list = require('./list.json');

require('dotenv').config()

let intervalID = null;

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const id = process.env.FACEBOOK_ID;

if (module.parent) {
  module.exports = start;
} else {
  try {
    process.argv[2] ? start(parseFloat(process.argv[2])) : start();
  }
  catch (e) { console.error(e); }
}

function start(interval = 1) {
  if (!PAGE_ACCESS_TOKEN || !id) {
    throw 'Missing env value(s)'
  }

  watch();
  intervalID = setInterval(watch, interval * 1000);

  sendMessage(interval + 's Watching');
}

function watch() {
  fetch(list[0])
    .then(result => {
      if (!result.price) {
        console.warn('Nope');
      }
      else {
        console.log('Yes!');
        inStock(result);
      }
    })
    .catch(console.error);
}

function inStock(item) {
  if (intervalID) clearInterval(intervalID);
  const text = `${item.name} is available for ${item.price} at ${item.url}`;
  sendMessage(text);
}

function sendMessage(text) {
  const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN;
  const json = {
    recipient: { id },
    message: { text }
  };
  request({
    url,
    json,
    method: 'POST'
  }, (error) => {
    if (error) console.error(error);
    else console.log('Message Sent');
  });
}
