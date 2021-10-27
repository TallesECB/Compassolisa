const UserController = require('../app/controller/UserController');
const createValidation = require('../app/validation/user/create');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, UserController.create);
  routes.get('/', UserController.getAll);
  routes.get('/:idPeople', UserController.getById);
  routes.put('/:idPeople', createValidation, UserController.update);
  routes.delete('/:idPeople', UserController.remove);
  
  server.use(prefix, routes);
}