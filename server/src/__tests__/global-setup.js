if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Knex = require('knex');
const path = require('path');

// create the DB
async function createTestDatabase() {
  const knex = Knex({
    client: 'mysql',
    connection: {
      /* connection info without database */
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PW,
    },
  });

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${process.env.TEST_DB_NAME}`);
    await knex.raw(`CREATE DATABASE ${process.env.TEST_DB_NAME}`);
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  const knex = Knex({
    client: 'mysql',
    connection: {
      /* connection info WITH database */
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PW,
    },
    migrations: {
      directory: path.join(__dirname, '../db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '../db/seeds'),
    },
  });

  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
