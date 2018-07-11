const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

let manticores = [
  {name: 'Fluffy', key: 'fluffy', imgUrl: 'https://vignette.wikia.nocookie.net/harrypotter/images/1/15/Manticore_FBCFWW.png/revision/latest?cb=20170413064522', description: 'Fluffy is an adorable French Poodle / Lion / Scorpion / Human mix'},
  {name: 'Bruce', key: 'bruce', imgUrl: 'https://i1.wp.com/www.championsofgods.com/wp-content/uploads/2017/06/Persian-Manticore.jpg?fit=1280%2C905&ssl=1', description: 'This playful scamp comes from Australia.  Loves fetch!'}
];

app.get('/', (req, res) => {
  res.redirect('/manticores');
});
app.get('/manticores', (req, res) => {
  res.render('index', {manticores: manticores});
});

app.get('/manticores/new', (req, res) => {
  res.render('new');
})

app.post('/manticores', (req, res) => {
  // Create a new manticore
  console.log(req.body);
  const newManticore = {
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    key: req.body.name.toLowerCase()
  };
  manticores.push(newManticore);
  res.redirect('/manticores');
})

app.get('/manticores/:key', (req, res) => {
  const lowerKey = req.params.key.toLowerCase();
  const manticore = manticores.find((manticore) => {
    return manticore.key.toLowerCase() === lowerKey;
  });

  res.render('show', {manticore: manticore});
});

app.get('/manticores/:key/edit', (req, res) => {
  res.render('edit');
});

app.post('/manticores/:key/edit', (req, res) => {
  res.redirect('/manticores/' + req.params.key);
});

app.post('/manticores/:key/delete', (req, res) => {
  const lowerKey = req.params.key.toLowerCase()
  manticores = manticores.filter((manticore) => {
    return manticore.key.toLowerCase() !== lowerKey
  });
  res.redirect('/manticores');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(8080, () => {
  console.log('Listening on 8080');
});