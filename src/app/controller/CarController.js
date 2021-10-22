const CarService = require('../service/CarService');

class CarController  {
  async create(req, res) {
    const result = await CarService.create(req.body);
    return res.status(201).json(result)
  }
  async find(req, res) {
    const result = await CarService.find();
    return res.status(200).json(result)
  }
  async findById(req, res) {
    const id = req.params.idCar
    const result = await CarService.findById(id);
    return res.status(200).json(result)
  }
  //async remove(req, res) {return res.status(201).json(result)},
  //async change(req, res) { return res.status(201).json(result)},
  //async getName(req, res) {return res.status(201).json(result)}
}

module.exports = new CarController();