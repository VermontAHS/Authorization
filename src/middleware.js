const knex = require('knex');
const config = require('../knexfile');
const client = knex(config.development);

module.exports.createUser = (req, res) => {
  return client('users')
    .insert({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mi: req.body.mi || '',
      suffix: req.body.suffix || '',
      email: req.body.email,
      password: req.body.password,
    })
    .then(() => {
      return res.send(req.body.username);
    })
    .catch(err => {
      return res.send(err);
    });
};

module.exports.deleteUser = (req, res) => {
  return client('users')
    .where({ id: req.params.id })
    .del()
    .then(() => {
      return res.send(req.params.id);
    })
    .catch(err => {
      return res.send(err);
    });
};

module.exports.getUser = (req, res) => {
  return client('users')
    .where({ id: req.params.id })
    .then(result => {
      return res.send(result[0]);
    })
    .catch(err => {
      return res.send(err);
    });
};

module.exports.signIn = (req, res) => {
  return client('users')
    .where({ username: req.body.username, password: req.body.password })
    .then(result => {
      return res.send(result[0]);
    })
    .catch(err => {
      return res.send(err);
    });
};

module.exports.getUsers = (req, res) => {
  return client('users')
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.send(err);
    });
};

module.exports.updateUser = (req, res) => {
  return client('users')
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return res.send(req.params.id);
    })
    .catch(err => {
      return res.send(err);
    });
};
