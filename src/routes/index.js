const { Router } = require('express');
const user = require('./user.router');
const car = require('./car.router');
const auth = require('./auth.router');
const rental = require('./rental.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    user(server, new Router());
    car(server, new Router());
    auth(server, new Router());
    rental(server, new Router());
    next();
  });
};
