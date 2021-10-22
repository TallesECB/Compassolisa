const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/v1/car') => {
  routes.post('/', createValidation, CarController.create);
  routes.get('/', CarController.find);
  routes.get('/:idCar', CarController.findById);
  
  server.use(prefix, routes);
}