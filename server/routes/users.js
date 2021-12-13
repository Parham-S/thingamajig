// ./server/routes/users.js

const router = require('express').Router();
const { signUpSchema, signInSchema } = require('../middleware/schemas');
const auth = require('../middleware/auth');
const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require('../controllers/users');

// POST /api/v1/users/signup
router.post('/signup', signUpSchema, signUpUser);

// POST /api/v1/users/signin
router.post('/signin', signInSchema, signInUser);

/**
 * @api {get} /api/v1/users/current
 * Authentication required
 */
router.get('/current', auth, getCurrentUser);

module.exports = router;
