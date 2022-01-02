// ./server/routes/auth.js

import { signToken, getPayloadObjFromUser } from '../helpers/index';
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import passport from 'passport';
import { ErrorHandler } from '../helpers/error';

// FIXME
const CLIENT_URL = 'http://localhost:3000';

// GET /auth/login/failed
router.get('/login/failed', (req: Request, res: Response) => {
  throw new ErrorHandler(401, 'Error in provider');
});

// GET /auth/github
// called from our CLIENT (our React App)
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

function successfulCallback(req: Request, res: Response, next: NextFunction) {
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

export default router;