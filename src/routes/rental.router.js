const RentalController = require('../app/controller/RentalController');
const createValidation = require('../app/validation/rental/create');
const idValidation = require('../app/validation/getIdValid')
const getAllValidation = require('../app/validation/rental/getAll')

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createValidation, RentalController.create);
  routes.get('/', getAllValidation, RentalController.getAll);
  routes.get('/:id', idValidation, RentalController.getById);
  routes.put('/:id', idValidation, createValidation, RentalController.update);
  routes.delete('/:id', idValidation, RentalController.remove);
  
  server.use(prefix, routes);
}