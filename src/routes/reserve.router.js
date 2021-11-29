const ReserveController = require('../app/controller/ReserveController');
const authMiddleware = require('../app/validation/auth/auth');
const createValidation = require('../app/validation/reserve/create');
const idValidationReserve = require('../app/validation/reserve/getIdValid');
const getAllValidation = require('../app/validation/reserve/getAll');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.use(authMiddleware);

  routes.post('/:rentalID/reserve/', idValidationReserve, createValidation, ReserveController.create);
  routes.get('/:rentalID/reserve/', idValidationReserve, getAllValidation, ReserveController.getAll);
  routes.get('/:rentalID/reserve/:id', idValidationReserve, ReserveController.getById);
  routes.put('/:rentalID/reserve/:id', idValidationReserve, createValidation, ReserveController.update);
  routes.delete('/:rentalID/reserve/:id', idValidationReserve, ReserveController.remove);

  server.use(prefix, routes);
};
