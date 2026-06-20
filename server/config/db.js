const { Pool } = require('pg');
const { db } = require('./env');

const pool = new Pool(db);

pool.on('error', (error) => {
  console.error('Database error', error);
});

module.exports = pool;
