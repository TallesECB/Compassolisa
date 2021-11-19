const FleetController = require('../app/controller/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental/:id/fleet') => {
  routes.post('/', FleetController.create);
  routes.get('/', FleetController.getAll);
  routes.get('/:id', FleetController.getById);
  routes.put('/:id', FleetController.update);
  routes.delete('/:id', FleetController.remove);

  server.use(prefix, routes);
};
