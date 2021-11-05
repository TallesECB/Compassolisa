const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const updateAcessoryValidation = require('../app/validation/car/updateAcessory')
const idValidation = require('../app/validation/getIdValid')
const getAllValidation = require('../app/validation/car/getAll')

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', createValidation, CarController.create);
  routes.get('/', getAllValidation, CarController.getAll);
  routes.get('/:id', idValidation, CarController.getById);
  routes.put('/:id', idValidation, createValidation, CarController.update);
  routes.patch('/:id/acessorios/:idAcessory', idValidation, updateAcessoryValidation, CarController.updateAcessory);
  routes.delete('/:id', idValidation, CarController.remove);

  server.use(prefix, routes);
}