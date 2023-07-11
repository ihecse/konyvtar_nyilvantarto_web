const Schema = require('mongoose').Schema;
const db = require('../config/db');
const Konyv = require('./konyv');

const Kolcsonzes = db.model('Kolcsonzes', {
  nev: String,
  kolcsonzes_kezdete: Date,
  kolcsonzes_vege: Date,
  _kolcsonzott: {
    type: Schema.Types.ObjectId,
    ref: 'Konyv'
  }
});

module.exports = Kolcsonzes;