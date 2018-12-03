const express = require('express');
const routes = express();

routes.get('/', (req, res) => res.render('home'));

routes.get('/login', (req, res) => res.render('home'));

module.exports = routes;
