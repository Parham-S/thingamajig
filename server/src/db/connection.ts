import knex, { Knex } from 'knex';
import knexfile from './knexfile';

const env = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexfile[env];
const db: Knex = knex(config);

export default db;
