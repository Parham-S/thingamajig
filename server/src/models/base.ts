import { v4 as uuidv4 } from 'uuid';
import { filterObj } from '../helpers';

// Hat tip:
// https://github.com/robmclarty/knex-express-project-sample/blob/main/server/helpers/model-guts.js

const BaseModel = ({ db, DB_TABLE, FIELD_WHITELIST }) => {

  // NOTE: you may see docs asking for "returning", but MySQL
  // does not support this. It's shockingly difficult to get
  // the newly generated default UUID that MySQL creates, so
  // we'll just create the ID ourselves.

  const create = (user) => {
    const id = uuidv4();
    const filtered = filterObj(user, (key: string, _val) =>
      FIELD_WHITELIST.includes(key)
    );
    return db(DB_TABLE)
      .insert({ ...filtered, id })
      .then(() => findOne({ id }));
  };

  const del = (id: string) => db(DB_TABLE).where({ id }).del();
  const find = (filters: Record<string, unknown>) => db(DB_TABLE).where(filters);
  const findAll = () => db(DB_TABLE);
  const findOne = (filters: Record<string, unknown>) => db(DB_TABLE).where(filters).first();
  const update = (id: string, newObj: Record<string, unknown>) => {
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

export = BaseModel;
