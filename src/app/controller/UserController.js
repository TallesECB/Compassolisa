const UserService = require('../service/UserService');

class UserController  {
  async create(req, res) {
    try {
      const result = await UserService.create(req.body);
      return res.status(201).json(result);
    } catch(erro) {
      return res.status(erro.statusCode || 400).json(erro.message).end();
    }
  }
  async getAll(req, res) { 
    try {
      const result = await UserService.getAll(req.query);
      return res.status(200).json(result);
    } catch(erro) {
      return res.status(erro.statusCode).json(erro.message).end();
    }
  }
  async getById(req, res) {
    try {
      const id = req.params.idPeople;
      const result = await UserService.getById(id);
      return res.status(200).json(result);
    } catch(erro) {
      return res.status(erro.statusCode).json(erro.message).end();
    }
  }
  async update(req, res) {
    try {
      const id = req.params.idPeople;
      const result = await UserService.update(id, req.body);
      return res.status(200).json(result);
    } catch(erro) {
      return res.status(erro.statusCode || 400).json(erro.message).end();
    }
  }
  async remove(req, res) {
    try {
      const id = req.params.idPeople;
      await UserService.remove(id);
      return res.status(204).end();
    } catch(erro) {
      return res.status(erro.statusCode).json(erro.message).end();
    }
  }
}

module.exports = new UserController();