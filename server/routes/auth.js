// ./server/routes/auth.js

const { signToken, getPayloadObjFromUser } = require('../helpers/index');

const router = require('express').Router();
const passport = require('passport');
const { ErrorHandler } = require('../helpers/error');
// FIXME
const CLIENT_URL = 'http://localhost:3000';

// GET /auth/login/failed
router.get('/login/failed', (req, res) => {
  throw new ErrorHandler(401, 'Error in provider');
});

// GET /auth/github
// called from our CLIENT (our React App)
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

function successfulCallback(req, res, next) {
  const tokenizedUser = getPayloadObjFromUser(
    JSON.parse(JSON.stringify(req.user))
  );
  const token = signToken(tokenizedUser);
  res.status(301).redirect(`${CLIENT_URL}/redirect?token=${token}`);
}

// GET /auth/github/callback
// called by github.com via the Authorization callback URL field
// on https://github.com/settings/applications/new AND set in
// GitHubConfig in /server/config/passport.js

// From here we can call provider to get an access_token
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login/failed',
  }),
  successfulCallback
);

module.exports = router;
