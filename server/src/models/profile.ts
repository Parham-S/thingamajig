import db from "../db/connection";
import BaseModel from "./base";

const base = BaseModel({
  db,
  DB_TABLE: 'profiles',
  FIELD_WHITELIST: ['user_id', 'first_name', 'last_name', 'avatar'],
});

export = { ...base };
