const jsdom = require('jsdom');
const request = require('request');
const fetch = require('./fetch');
const list = require('./list.json');
const {
  PAGE_ACCESS_TOKEN,
  id
} = require('./env.json');

const interval = parseFloat(process.argv[2]) || 1;

let intervalID = null;

intervalID = setInterval(watch, interval * 1000);

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
  const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN;
  const text = `${item.name} is available for ${item.price} at ${item.url}`;
  const json = {
    recipient: { id },
    message: { text }
  };
  request({
    url,
    json,
    method: 'POST'
  }, (error) => {
    if (error) console.erroe(error);
    else console.log('Message Sent');
  });
}
