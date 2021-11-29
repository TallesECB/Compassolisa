const ReserveService = require('../service/ReserveService');
const { paginateSerialize, serialize } = require('../serialize/reserveSerialize');
const { serializeErrors } = require('../serialize/errorSerialize');

class ReserveController {
  async create(req, res) {
    try {
      const result = await ReserveService.create(req.body, req.params, req.headers);
      return res.status(201).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getAll(req, res) {
    try {
      const result = await ReserveService.getAll(req.query, req.params);
      return res.status(200).json(paginateSerialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const { rentalID } = req.params;
      const result = await ReserveService.getById(id, rentalID);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { rentalID } = req.params;
      const result = await ReserveService.update(id, rentalID, req.body, req.headers);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const { rentalID } = req.params;
      await ReserveService.remove(id, rentalID);
      return res.status(204).end();
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }
}

module.exports = new ReserveController();
