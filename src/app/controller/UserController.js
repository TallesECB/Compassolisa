const UserService = require('../service/UserService');

class UserController  {
  async create(req, res) {
    const result = await UserService.create(req.body);
    return res.status(201).json(result)
  }
  async find(req, res) {
    const result = await UserService.find();
    return res.status(200).json(result)
  }
  async findById(req, res) {
    const id = req.params.idPeaple
    const result = await UserService.findById(id);
    return res.status(200).json(result)
  }
}

module.exports = new UserController();