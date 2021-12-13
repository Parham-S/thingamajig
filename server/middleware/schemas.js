const Joi = require('joi');
const { ErrorHandler } = require('../helpers/error');

function signInSchema(req, res, next) {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function signUpSchema(req, res, next) {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const msg = `Validation error: ${error.details
      .map((x) => x.message)
      .join(', ')}`;
    throw new ErrorHandler(400, msg);
  } else {
    req.body = value;
    next();
  }
}

module.exports = { signInSchema, signUpSchema };
