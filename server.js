const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/manticores', (req, res) => {
  res.render('index');
});

app.get('/manticores/new', (req, res) => {
  res.render('new');
})

app.post('/manticores', (req, res) => {
  // Create a new manticore
  res.redirect('/manticores');
})

app.get('/manticores/:key', (req, res) => {
  res.render('show');
});

app.get('/manticores/:key/edit', (req, res) => {
  res.render('edit');
});

app.post('/manticores/:key/edit', (req, res) => {
  res.redirect('/manticores/' + req.params.key);
});

app.post('/manticores/:key/delete', (req, res) => {
  res.redirect('/manticores');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(8080, () => {
  console.log('Listening on 8080');
});