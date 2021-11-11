const UserService = require('../service/UserService');
const { paginateSerialize, serialize } = require('../serialize/userSerialize');
const AuthService = require('../service/AuthService');

class UserController {
  async create(req, res) {
    try {
      const result = await UserService.create(req.body);
      const { email } = result;
      const { habilitado } = result;
      const token = await AuthService.generateToken({ email, habilitado });
      return res.status(201).json(serialize(result, token));
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
      const result = await UserService.getAll(req.query);
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
      const result = await UserService.getById(id);
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
      const result = await UserService.update(id, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      const err = {
        description: erro.description,
        name: erro.name
      };
      return res.status(erro.statusCode).json(err);
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await UserService.remove(id);
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

module.exports = new UserController();
