const express = require('express');
const html = require('html-template-tag');
const morgan = require('morgan');
// const pg = require('pg');
const { db } = require('./models');
const app = new express();
const layout = require('./views/layout');

db.authenticate().then(() => {
  console.log('We are connected!');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send(layout(''));
});

(async () => { await db.sync({force: true}); })();

app.listen(1337);
