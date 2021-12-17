// ./server/index.js

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { handleError } = require('./helpers/error');

app.use(express.json());
app.use(morgan('dev'));

app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.send('ok');
});
app.use('/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// Make sure you put this code snippet AFTER you define
// your routes, but BEFORE you set up app.listen!

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;

if (require.main === module) {
  // Start server only when we run this on the command
  // line and explicitly ignore this while testing
  app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}!`)
  );
}
