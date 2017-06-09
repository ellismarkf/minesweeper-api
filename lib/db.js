const pg = require('pg');
pg.defaults.ssl = true;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports = {
  query(text, values) {
    return pool.query(text, values);
  },
};

