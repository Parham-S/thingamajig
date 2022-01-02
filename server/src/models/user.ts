// ./server/src/models/user.ts

import db from "../db/connection";
import BaseModel from "./base";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../helpers/error";

const base = BaseModel({
  db,
  DB_TABLE: 'users',
  FIELD_WHITELIST: ['user_name', 'password_hash', 'email'],
});

// always hash the password before saving to DB
const SALT_ROUNDS = 8;
const hashedPW = (password: string) => bcrypt.hash(password, SALT_ROUNDS);

/**
 * @async
 * @param {*} user
 * @returns
 */
const beforeSave = (user): Promise<Record<string, unknown>> => {
  if (!user.password) return Promise.resolve(user);
  return hashedPW(user.password)
    .then((hash: string) => {
      return Promise.resolve({ ...user, password_hash: hash });
    })
    .catch((err) => {
      throw new ErrorHandler(500, 'Error hashing password');
    });
};

// overwrite the default's create method to include beforeSave logic
const create = (props) => beforeSave(props).then((user) => base.create(user));

const hasRows = async (filters: Record<string, unknown>) => {
  const rowCount = await base.findOne(filters).clone().count();
  return rowCount['count(*)'] > 0;
};

export = {
  ...base,
  create,
  hasRows,
};
