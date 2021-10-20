const UserController = require('../app/controller/UserController');
const createValidation = require('../app/validation/user/create');

module.exports = (server, routes, prefix = '/v1/peaple') => {
  routes.post('/', createValidation, UserController.create);
  server.use(prefix, routes);
}