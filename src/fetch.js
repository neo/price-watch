const jsdom = require('jsdom');

module.exports = function(item) {
  return new Promise((resolve, reject) => {
    jsdom.env(item.url, (error, window) => {
      if (error) reject(error);
      const priceTag = window.document.querySelector(item.selector);
      resolve({
        name: item.name || window.document.title,
        price: priceTag.innerHTML.trim()
      });
    });
  });
};
