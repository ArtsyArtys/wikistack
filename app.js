const express = require('express');
const html = require('html-template-tag');
const morgan = require('morgan');
// const pg = require('pg');
const { db } = require('./models');
const {Page}=require('./models');
const app = new express();
const layout = require('./views/layout');
const wikiRoute=require('./routes/wiki');
const userRoute=require('./routes/user');
const main=require('./views/main');

db.authenticate().then(() => {
  console.log('We are connected!');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users',userRoute);
app.use('/wiki', wikiRoute);

app.get('/', async (req, res, next) => {
  const pages=await Page.findAll();
  console.log(pages);
  res.send(layout(main(pages)));
});

(async () => { await db.sync(); })();

app.listen(1337);
