const { Router } = require('express');
const user = require('../routes/user.router');
const car = require('../routes/car.router');
const auth = require('../routes/auth.router');
const rental = require('../routes/rental.router');

module.exports = server => {
  server.use((req, res, next) => {
    user(server, new Router());
    car(server, new Router());
    auth(server, new Router());
    rental(server, new Router());
    next();
  });
}