const { Router } = require('express');
const user = require('../routes/user.router')
const car = require('../routes/car.router')

module.exports = server => {
  server.use((req, res, next) => {
    user(server, new Router());
    car(server, new Router())
    next();
  });
}