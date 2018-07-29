import {schema, SchemaParser} from './db';
import Entity from './models/Entity';
import Entities from './models/Entities';
import Relationships from './models/Relationships';

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});

// Entity.fromDB('users', {id: 8}, ['password', 'stripe_customer_id']).then(entity => entity && console.log(entity.toJSON()));
// Entities.fromDB('users', {}, ['password', 'stripe_customer_id']).then(entity => console.log(entity.toJSON()));

// const promise = Relationships.fromDB(
//     'user_guest_at_event',
//     ['users', 'events'],
//     {guest: 11, event: 34},
//     {users: {id: 8}, events: {id: 34}},
//     [],
//     {users: ['password']}
// );
// promise.then(x => console.log(x.models));

const schemaParser = new SchemaParser(schema);
schemaParser.generateRoutes(app);

module.exports = app;
