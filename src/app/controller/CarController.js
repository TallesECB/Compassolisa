const CarService = require('../service/CarService');
const { paginateSerialize, serialize } = require('../serialize/carSerialize');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).send(serialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }

  async getAll(req, res) {
    try {
      const result = await CarService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await CarService.getById(id);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await CarService.update(id, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }

  async updateAcessory(req, res) {
    try {
      const idCar = req.params.id;
      const { idAcessory } = req.params;
      const result = await CarService.updateAcessory(idCar, idAcessory, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(404).json(err);
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await CarService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }
}

module.exports = new CarController();
