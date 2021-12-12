// Update with your config settings.
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: '../../.env' });
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
    },
  },
  test: {
    client: 'mysql',
    connection: {
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PW,
    },
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  },
};
