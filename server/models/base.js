const { v4: uuidv4 } = require('uuid');
const { filterObj } = require('../helpers');

// Hat tip:
// https://github.com/robmclarty/knex-express-project-sample/blob/main/server/helpers/model-guts.js

const BaseModel = ({ db, DB_TABLE, FIELD_WHITELIST }) => {
  // NOTE: you may see docs asking for "returning", but MySQL
  // does not support this. It's shockingly difficult to get
  // the newly generated default UUID that MySQL creates, so
  // we'll just create the ID ourselves.
  const create = (user) => {
    const id = uuidv4();
    const filtered = filterObj(user, (key, _val) =>
      FIELD_WHITELIST.includes(key)
    );
    return db(DB_TABLE)
      .insert({ ...filtered, id })
      .then(() => findOne({ id }));
  };

  const del = (id) => db(DB_TABLE).where({ id }).del();
  const find = (filters) => db(DB_TABLE).where(filters);
  const findAll = () => db(DB_TABLE);
  const findOne = (filters) => db(DB_TABLE).where(filters).first();
  const update = (id, newObj) => {
    delete newObj.id; // not allowed to set `id`
    return db(DB_TABLE).where({ id }).update(newObj);
  };
  return {
    db,
    DB_TABLE,
    FIELD_WHITELIST,
    create,
    del,
    find,
    findAll,
    findOne,
    update,
  };
};

module.exports = BaseModel;
