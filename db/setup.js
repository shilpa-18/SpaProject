const pgp = require('pg-promise')();


const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'spa_location'
});

module.exports = db;