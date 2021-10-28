const UserService = require('../service/UserService');

class UserController  {
  async create(req, res, ) {
      const result = await UserService.create(req.body);
      return res.status(201).json(result)
  }
  async getAll(req, res) { 
    const result = await UserService.getAll(req.query);
    if(result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(`Não foi encontrado User através desta query`);
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.idPeople
      const result = await UserService.getById(id);
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async update(req, res) {
    try {
      const id = req.params.idPeople
      const result = await UserService.update(id, req.body)
      return res.status(200).json(result);
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.idPeople;
      await UserService.remove(id);
      return res.status(204).end()
    } catch(erro) {
      res.status(erro.statusCode).json(erro.message).end()
    }
  }
}

module.exports = new UserController();