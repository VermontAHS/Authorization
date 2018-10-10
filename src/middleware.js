const knex = require('knex')
const config = require('../knexfile')
const client = knex(config.development)

module.exports.createUser = (req, res) => {
  return client('users')
    .insert({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mi: req.body.mi,
      suffix: req.body.suffix,
      email: req.body.email,
      password: req.body.password
    })
    .then(result => {
      return res.send(result[0])
    })
    .catch(err => {
      return res.send(err)
    })
}

module.exports.deleteUser = (req, res) => {
  return client('users')
    .where({id: req.params.id})
    .del()
    .then(result => {
      return res.send(result)
    })
    .catch(err => {
      return res.send(err)
    })
}

module.exports.getUser = (req, res) => {
  return client('users')
    .where({'id': req.params.id})
    .then(result => {
      return res.send(result[0])
    })
    .catch(err => {
      return res.send(err)
    })
}

module.exports.updateUser = (req, res) => {

  return client('users')
    .where({id: req.params.id})
    .update(req.body)
    .then(result => {
      return res.send(true)
    })
    .catch(err => {
      return res.send(err)
    })
}
