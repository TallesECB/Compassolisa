const FleetController = require('../app/controller/FleetController');
const createValidation = require('../app/validation/fleet/create');
const idValidationFleet = require('../app/validation/fleet/getIdValid');
const getAllValidation = require('../app/validation/fleet/getAll');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:rentalID/fleet', idValidationFleet, createValidation, FleetController.create);
  routes.get('/:rentalID/fleet', idValidationFleet, getAllValidation, FleetController.getAll);
  routes.get('/:rentalID/fleet/:id', idValidationFleet, FleetController.getById);
  routes.put('/:rentalID/fleet/:id', idValidationFleet, createValidation, FleetController.update);
  routes.delete('/:rentalID/fleet/:id', idValidationFleet, FleetController.remove);

  server.use(prefix, routes);
};
