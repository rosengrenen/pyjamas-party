const express = require('express');
const app = express();
const port = 3000;
const Knex = require('knex');
const bodyParser = require('body-parser');
const knexConfig = require('../knexfile');

var knex = Knex(knexConfig);

app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (_req, res) => {
  res.render('index', { title: 'Skicka en fråga' });
});

app.post('/', async (req, res) => {
  await knex.table('questions').insert({
    question: req.body.question
  });

  res.redirect('/thanks');
});

app.get("/thanks", (_req, res) => {
  res.render("thanks", { title: "Tack" });
});

app.get('/questions', async (_req, res) => {
  const questions = await knex.table('questions').select();
  res.render("questions", { 
    questions: questions.map(({ question }) => question),
    title: 'Frågor',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
