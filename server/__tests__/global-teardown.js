if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Knex = require('knex');
const knex = Knex({
  client: 'mysql',
  connection: {
    /* connection info without database */
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PW,
  },
});

module.exports = async () => {
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${process.env.TEST_DB_NAME}`);
    await knex.destroy();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
