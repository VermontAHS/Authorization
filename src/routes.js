const express = require('express');
const routes = express();
const middleware = require('./middleware');

routes.post('/create', middleware.createUser);

routes.delete('/delete/:id', middleware.deleteUser);

routes.put('/update/:id', middleware.updateUser);

routes.get('/user/:id', middleware.getUser);

routes.get('/users', middleware.getUsers);

routes.post('/signin', middleware.signIn);

routes.get('/', (req, res) => res.render('home'));

routes.get('/login', (req, res) => res.render('home'));

module.exports = routes;
