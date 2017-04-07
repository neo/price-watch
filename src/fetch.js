const jsdom = require('jsdom');

module.exports = function(item) {
  return new Promise((resolve, reject) => {
    jsdom.env(item.url, (error, window) => {
      if (error) {
        reject(error);
        return;
      }
      if (!window) {
        reject('undefined window');
        return;
      }
      const priceTag = window.document.querySelector(item.selector);
      resolve({
        name: item.name || window.document.title,
        price: priceTag ? priceTag.innerHTML.trim() : 0,
        url: item.url
      });
    });
  });
};
