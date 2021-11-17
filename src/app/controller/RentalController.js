const RentalService = require('../service/RentalService');
const { paginateSerialize, serialize } = require('../serialize/rentalSerialize');
const { serializeErrors } = require('../serialize/errorSerialize');

class RentalController {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getAll(req, res) {
    try {
      const result = await RentalService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await RentalService.getById(id);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await RentalService.update(id, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await RentalService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }
}

module.exports = new RentalController();
