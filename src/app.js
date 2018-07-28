import Entity from './models/Entity';
import Entities from './models/Entities';

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

// Entity.fromDB('users', {id: 10}).then(entity => console.log(entity));
Entities.fromDB('users').then(entity => console.log(entity));

module.exports = app;
