const { object } = require('joi');
const CarService = require('../service/CarService');

class CarController  {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async getAll(req, res) { 
    const result = await CarService.getAll(req.query);
    if(result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(`Não foi encontrado Carro através desta query`);
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.idCar
      const result = await CarService.getById(id);
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async update(req, res) {
    try {
      const id = req.params.idCar
      const result = await CarService.update(id, req.body)
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.idCar;
      await CarService.remove(id);
      return res.status(204).end()
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
}

module.exports = new CarController();