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
  async find(req, res) { //necessário ajeitar a paginação
    const payloadFind = req.query;
    const result = await CarService.find(payloadFind);
    if(result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(`Não foi encontrado Carro através desta query`);
    }
  }
  async findById(req, res) {
    try {
      const id = req.params.idCar
      const result = await CarService.findById(id);
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async findByIdAndUpdate(req, res) {
    try {
      const id = req.params.idCar
      const result = await CarService.findByIdAndUpdate(id, req.body)
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async findByIdAndRemove(req, res) {
    try {
      const id = req.params.idCar;
      await CarService.findByIdAndRemove(id);
      return res.status(204).end()
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
}

module.exports = new CarController();