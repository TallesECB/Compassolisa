const FleetService = require('../service/FleetService');
const { paginateSerialize, serialize } = require('../serialize/fleetSerialize');
const { serializeErrors } = require('../serialize/errorSerialize');

class RentalController {
  async create(req, res) {
    try {
      const result = await FleetService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getAll(req, res) {
    try {
      const result = await FleetService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await FleetService.getById(id);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await FleetService.update(id, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await FleetService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }
}

module.exports = new RentalController();
