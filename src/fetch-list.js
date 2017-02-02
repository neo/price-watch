const fetch = require('./fetch');
const list = require('./list.json');
list.map(item => fetch(item).then(console.log));
