const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const user = require('./user.router');
const car = require('./car.router');
const auth = require('./auth.router');
const rental = require('./rental.router');
const fleet = require('./fleet.router');
const reserve = require('./reserve.router');

const swaggerDocs = require('../../Swagger.json');

module.exports = (server) => {
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  server.use((req, res, next) => {
    user(server, new Router());
    car(server, new Router());
    auth(server, new Router());
    rental(server, new Router());
    fleet(server, new Router());
    reserve(server, new Router());
    next();
  });
};
