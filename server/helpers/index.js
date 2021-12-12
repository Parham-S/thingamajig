// ./server/helpers/index.js

const jwt = require('jsonwebtoken');

/**
 * filter method but for keys and objects
 * @param {object} obj - e.g. { name: 'john', lastName: 'smith', age: 32 }
 * @param {function} predicate - e.g. (key, value) => key!=='age' && value!=='smith'
 * @returns {object} result - e.g. { name: "john" }
 */
const filterObj = (obj, predicate) => {
  let result = {},
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Take a full name and parse into properties
 * @param {string} input - full name
 * @returns {object} result
 * @see https://stackoverflow.com/a/40141884
 */
const parseName = (input) => {
  const fullName = input || '';
  const result = {};

  if (fullName.length > 0) {
    const nameTokens =
      fullName.match(
        /[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g
      ) || [];

    result.name = nameTokens.slice(0, nameTokens.length > 3 ? 2 : 1).join(' ');

    if (nameTokens.length > 2) {
      result.lastName = nameTokens.slice(-2, -1).join(' ');
      result.secondLastName = nameTokens.slice(-1).join(' ');
    } else {
      result.lastName = nameTokens.slice(-1).join(' ');
      result.secondLastName = '';
    }
  }
  return result;
};

/**
 * Given a user object, return an object that has
 * just enough information for the payload; their
 * user ID. No encryption yet, and we should only
 * return non-mutable things such as ids and roles.
 * @param {object} user
 * @return {object}
 */
const getPayloadObjFromUser = (user) => {
  const { id } = user;
  return { id };
};

/**
 * Helper function to sign token
 * @param {object} obj - the object to be tokenized
 * @returns {string} The signed JWT token
 */
const signToken = (obj) =>
  jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '24h' });

module.exports = { filterObj, parseName, getPayloadObjFromUser, signToken };
