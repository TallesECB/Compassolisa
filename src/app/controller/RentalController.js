const RentalService = require('../service/RentalService');
const { paginateSerialize, serialize} = require('../serialize/rentalSerialize')

class RentalController  {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode || 400).json(err).end();
    }
  }
  async getAll(req, res) { 
    try {
      const result = await RentalService.getAll(req.query); 
      return res.status(200).json(paginateSerialize(result)).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.id;
      const result = await RentalService.getById(id);
      return res.status(200).json(serialize(result));
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const result = await RentalService.update(id, req.body);
      return res.status(200).json(serialize(result)).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode || 400).json(err).end();
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.id;
      await RentalService.remove(id);
      return res.status(204).end();
    } catch(erro) {
      const err = {
        description: erro.description,
        name: erro.name
      }
      return res.status(erro.statusCode).json(err).end();
    }
  }
}

module.exports = new RentalController();