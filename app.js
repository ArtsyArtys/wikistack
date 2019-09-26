const express = require('express');
const html = require('html-template-tag');
const morgan = require('morgan');
const pg = require('pg');
const sequelize = require('sequelize');
const app = new express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send('Look we exist!');
});


app.listen(1337);
