import knex, { Knex } from 'knex';
import knexfile from './knexfile';

let db: Knex;
const env = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexfile[env];
db = knex(config);

export default db;
