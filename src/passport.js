const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(
  new Strategy(function(username, password, done) {
    return db
      .authenticatUser({ username: username, password: password })
      .then(result => done(null, result))
      .catch(err => done(err));
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  return db.getByUserId(id).then(result => done(null, result));
});

module.exports = passport;
