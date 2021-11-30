const UserService = require('../service/UserService');
const { paginateSerialize, serialize } = require('../serialize/userSerialize');
const AuthService = require('../service/AuthService');
const { serializeErrors } = require('../serialize/errorSerialize');

class UserController {
  async create(req, res) {
    try {
      const result = await UserService.create(req.body);
      const { email, habilitado, _id } = result;
      const token = await AuthService.generateToken({ email, habilitado, _id });
      return res.status(201).json(serialize(result, token));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getAll(req, res) {
    try {
      const result = await UserService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.getById(id);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.update(id, req.body);
      return res.status(200).json(serialize(result));
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await UserService.remove(id);
      return res.status(204).end();
    } catch (erro) {
      return res.status(erro.statusCode).json(serializeErrors(erro));
    }
  }
}

module.exports = new UserController();
