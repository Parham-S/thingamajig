// ./server/config/passport.js

// instantiate Passport and Github Strategy

import passport from 'passport'
import axios from 'axios';
import Provider from '../models/provider'
import passportGithub from 'passport-github';

const GitHubStrategy = passportGithub.Strategy;

const GitHubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID || 'ERR',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'ERR',
  callbackURL: '/auth/github/callback',
};

async function getPrimaryEmailFromAccessToken(accessToken: string) {
  const authHeaders = {
    headers: {
      Authorization: 'token ' + accessToken,
      Accept: 'application/vnd.github.v3+json',
    },
  };
  const res = await axios.get(
    'https://api.github.com/user/emails',
    authHeaders
  );

  const primaryEmail = res.data.filter((email) => email.primary);
  return primaryEmail.length ? primaryEmail[0].email : false;
}

async function strategyCallback(
  accessToken: string, 
  refreshToken, 
  profile, 
  done
) {
  try {
    // Problem: GitHub only takes the email from the publicly accessible profile.
    // Many folks leave that blank. What we need is the actual email address the
    // user logins into GitHub with.

    const primaryEmail = await getPrimaryEmailFromAccessToken(accessToken);
    if (!primaryEmail) {
      return done(null, false, {
        message: 'Github profile does not have a primary email',
      });
    }
    const user = await Provider.findOrCreateByEmail({
      ...profile,
      primaryEmail,
    });

    return done(null, user);
  } catch (err) {
    return done(null, null, { message: 'unknown error' });
  }
}

passport.use(new GitHubStrategy(GitHubConfig, strategyCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
