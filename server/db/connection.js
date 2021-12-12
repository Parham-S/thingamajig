const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const configs = require('./knexfile')[env];
const connection = knex(configs);

module.exports = connection;
