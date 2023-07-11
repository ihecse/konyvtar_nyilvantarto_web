const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Konyv = db.model('Konyv', {
  szerzo: String,
  cim: String,
  ev: Number,
});

module.exports = Konyv;