const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Profile = require('../models/profile');
const { signToken, getPayloadObjFromUser } = require('../helpers/index');
const { ErrorHandler } = require('../helpers/error');

async function signUpUser(req, res, next) {
  try {
    const hasRows = await User.hasRows({ user_name: req.body.user_name });
    if (hasRows) {
      throw new ErrorHandler(400, 'Username already exists');
    }

    const createdUser = await User.create(req.body);
    await Profile.create({ ...req.body, user_id: createdUser.id });
    delete createdUser.password_hash;

    const token = signToken(getPayloadObjFromUser(createdUser));
    res.status(201).json({ user: createdUser, token });
  } catch (err) {
    next(err);
  }
}

async function signInUser(req, res, next) {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Don't give the password, even if it's hashed!
    delete user.password_hash;

    res
      .status(200)
      .json({ user, token: signToken(getPayloadObjFromUser(user)) });
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    // If our code gets here, it went through our middleware
    // first so we should have our email address of the logged
    // in person through req.user.

    const user = await User.findOne({ id: req.user });
    delete user.password_hash;

    const profile = await Profile.findOne({ user_id: req.user });
    delete profile.id;
    delete profile.user_id;

    return res.json({ ...user, ...profile });
  } catch (err) {
    next(err);
  }
}

module.exports = { signUpUser, signInUser, getCurrentUser };
