// ./server/routes/users.js

const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require('../controllers/users');

// POST /api/v1/users/signup
router.post('/signup', signUpUser);

// POST /api/v1/users/signin
router.post('/signin', signInUser);

/**
 * @api {post} /api/v1/users/current
 * Authentication required
 */
router.get('/current', auth, getCurrentUser);

module.exports = router;
