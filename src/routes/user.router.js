const UserController = require('../app/controller/UserController');
const createValidation = require('../app/validation/user/create');

module.exports = (server, routes, prefix = '/v1/peaple') => {
  routes.post('/', createValidation, UserController.create);
  routes.get('/', UserController.find);
  routes.get('/:idPeaple', UserController.findById);
  
  server.use(prefix, routes);
}