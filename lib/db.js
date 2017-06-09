const pg = require('pg');
pg.defaults.ssl = true;

// const config = {
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   max: 10,
//   idleTimeoutMillis: 30000,
// };

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports = {
  query(text, value) {
    return pool.query(text, values);
  },
};

