const db = require('../db/connection');
const BaseModel = require('./base');

const base = BaseModel({
  db,
  DB_TABLE: 'profiles',
  FIELD_WHITELIST: ['user_id', 'first_name', 'last_name', 'avatar'],
});

module.exports = { ...base };
