const app = require('express')();
const fetch = require('./fetch');
const list = require('./list.json');

app.get('/json', (req, res) => {
  Promise.all(list.map(fetch))
    .then(result => res.json(result))
    .catch(error => res.json({ error: error.message }));
});

app.listen(process.env.PORT || 3000);
