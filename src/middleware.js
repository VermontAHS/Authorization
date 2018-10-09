module.exports.createUser = (req, res) => {
  console.log(`Create User`)
  res.send('Create User');
}

module.exports.deleteUser = (req, res) => {
  console.log(`Delete User: ${req.params.id}`)
  res.send(req.params.id)
}

module.exports.getUser = (req, res) => {
  console.log(`Get User: ${req.params.id}`)
  res.send(req.params.id)
}

module.exports.updateUser = (req, res) => {
  console.log(`updateUser User: ${req.params.id}`)
  res.send(req.params.id)
}
