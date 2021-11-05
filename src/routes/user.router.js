const UserController = require('../app/controller/UserController');
const createValidation = require('../app/validation/user/create');
const idValidation = require('../app/validation/getIdValid')
const getAllValidation = require('../app/validation/user/getAll')

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, UserController.create);
  routes.get('/', getAllValidation, UserController.getAll);
  routes.get('/:id', idValidation, UserController.getById);
  routes.put('/:id', idValidation, createValidation, UserController.update);
  routes.delete('/:id', idValidation, UserController.remove);
  
  server.use(prefix, routes);
}