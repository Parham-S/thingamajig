const db = require('../db/connection');
const BaseModel = require('./base');
const User = require('./user');
const Profile = require('./profile');
const { parseName } = require('../helpers/index');

const base = BaseModel({
  db,
  DB_TABLE: 'provider_accounts',
  FIELD_WHITELIST: ['user_id', 'provider', 'provider_id'],
});

// overwriting to include the users table
const findOne = (filters) =>
  db('provider_accounts as pa')
    .join('users as u', 'u.id', 'pa.user_id')
    .select('u.id', 'user_name', 'email')
    .where(filters)
    .first();

const findOrCreateByEmail = async (providerProfile) => {
  const existingUser = await findOne({
    provider: 'github',
    provider_id: providerProfile.id,
  });
  if (existingUser) {
    return existingUser;
  }

  // assuming there isn't an existing account,
  //   1. create a new row in the users table
  //   2. create a new row in the profiles table
  //   3. create a new row in the provider_accounts table

  const newUser = await User.create({
    user_name: `provider_gh_${providerProfile.id}`,
    email: providerProfile.primaryEmail,
  });

  await base.create({
    user_id: newUser.id,
    provider: 'github', // if only for now
    provider_id: providerProfile.id,
  });

  const { name: firstName, lastName } = parseName(providerProfile.displayName);
  await Profile.create({
    user_id: newUser.id,
    first_name: firstName,
    last_name: lastName,
    avatar: providerProfile.photos?.length
      ? providerProfile.photos[0].value
      : '',
  });

  return newUser;
};

module.exports = { ...base, findOrCreateByEmail };
