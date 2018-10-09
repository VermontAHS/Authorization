const express = require('express');
const routes = express();
const middleware = require('./middleware');

routes.post('/create', middleware.createUser);

routes.delete('/delete/:id', middleware.deleteUser);

routes.put('/update/:id', middleware.updateUser);

routes.get('/:id', middleware.getUser);

module.exports = routes
