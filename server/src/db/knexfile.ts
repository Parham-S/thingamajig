// Update with your config settings.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

const config = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
    },
    migrations: {
      directory: __dirname + '/migrations',
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
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};

export default config;