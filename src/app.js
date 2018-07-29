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

const {pool} = require('./db');
// pool.query('SELECT * FROM "users"').then(x => console.log(x));

Entity.fromDB('users', {id: 8}, ['password', 'stripe_customer_id']).then(entity => entity && console.log(entity.toJSON()));
// Entities.fromDB('users', {}, ['password', 'stripe_customer_id']).then(entity => console.log(entity.toJSON()));

module.exports = app;
