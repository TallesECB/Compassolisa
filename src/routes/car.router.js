const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', createValidation, CarController.create);
  routes.get('/', CarController.find);
  routes.get('/:idCar', CarController.findById);
  routes.put('/:idCar', CarController.findByIdAndUpdate);
  routes.delete('/:idCar', CarController.findByIdAndRemove);

  server.use(prefix, routes);
}