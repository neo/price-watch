const app = require('express')();
const list = require('./list.json');
const fetch = require('./fetch');
const watch = require('./watch');

try { watch(60); }
catch(e) { console.error(e); }

app.get('/json', (req, res) => {
  Promise.all(list.map(fetch))
    .then(result => res.json(result))
    .catch(error => res.json({ error: error.message }));
});

app.listen(process.env.PORT || 3000);
