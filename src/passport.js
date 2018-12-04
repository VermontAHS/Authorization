const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(
  new Strategy(function(username, password, done) {
    return db
      .authenticateUser({ username: username, password: password })
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

passport.ensureLoggedIn = (options = {}) => {
  if (typeof options == 'string') {
    options = { redirectTo: options };
  }

  const url = options.redirectTo || '/login';
  const setReturnTo =
    options.setReturnTo === undefined ? true : options.setReturnTo;

  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.app.mountpath === '/api') {
        res.status(401);
        return res.send({ message: 'Must log in for access' });
      }
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(url);
    }
    next();
  };
};

module.exports = passport;
