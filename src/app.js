const express = require('express');
const router = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../Swagger.json')

require('./infra/database/mongo');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    router(this.server);
  }

}

module.exports = new App().server;