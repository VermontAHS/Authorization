const express = require('express');
const router = express();
const db = require('./db');
const passport = require('./passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(res.req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send({ message: 'Log out successful' });
});

router.get('/profile', passport.ensureLoggedIn(), (req, res) => {
  res.send(req.user);
});

module.exports = router;
