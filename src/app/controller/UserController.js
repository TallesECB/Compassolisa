const UserService = require('../service/UserService');

class UserController  {
  async create(req, res, ) {
      const result = await UserService.create(req.body);
      return res.status(201).json(result)
  }
  async find(req, res) {
    const payloadFind = req.query;
    const result = await UserService.find(payloadFind);
    if(result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(`Não foi encontrado User através desta query`);
    }
  }
  async findById(req, res) {
    try {
      const id = req.params.idPeople
      const result = await UserService.findById(id);
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async findByIdAndUpdate(req, res) {
    try {
      const id = req.params.idPeople
      const result = await UserService.findByIdAndUpdate(id, req.body)
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async findByIdAndRemove(req, res) {
    try {
      const id = req.params.idPeople;
      await UserService.findByIdAndRemove(id);
      return res.status(204).end()
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
}

module.exports = new UserController();