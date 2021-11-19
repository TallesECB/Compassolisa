const ReserveController = require('../app/controller/ReserveController');

module.exports = (server, routes, prefix = '/api/v1/rental/:id/reserve') => {
  routes.post('/', ReserveController.create);
  routes.get('/', ReserveController.getAll);
  routes.get('/:id', ReserveController.getById);
  routes.put('/:id', ReserveController.update);
  routes.delete('/:id', ReserveController.remove);

  server.use(prefix, routes);
};
