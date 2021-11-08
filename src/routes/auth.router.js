const AuthController = require('../app/controller/AuthController');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/', AuthController.login);

  server.use(prefix, routes);
};
