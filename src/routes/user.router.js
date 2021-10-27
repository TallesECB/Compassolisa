const UserController = require('../app/controller/UserController');
const createValidation = require('../app/validation/user/create');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, UserController.create);
  routes.get('/', UserController.find);
  routes.get('/:idPeople', UserController.findById);
  routes.put('/:idPeople', UserController.findByIdAndUpdate);
  routes.delete('/:idPeople', UserController.findByIdAndRemove);
  
  server.use(prefix, routes);
}