const pgp = require('pg-promise')();


var db = pgp( process.env.DATABASE_URL || 
'postgres://shilpaaradhya@localhost:5432/spa_location');

module.exports = db;


