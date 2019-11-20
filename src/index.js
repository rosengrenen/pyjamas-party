const express = require("express");
const app = express();
const port = 3000;
const Knex = require("knex");
const bodyParser = require("body-parser");
const knexConfig = require("../knexfile");

var knex = Knex(knexConfig);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', async (req, res) => {
  await knex.table("questions").insert({
    question: req.body.fraga
  });

  res.redirect('/tack.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
