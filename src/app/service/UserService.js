const UserRepository = require('../repository/UserRepository');

class UserService {
  async create(payload) {
    try {
      const result = await UserRepository.create(payload);
      return result;
    } catch (error) {
      return error;
    }
  }
  async find() {
    try {
      const result = await UserRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }
  async findById(id) {
    try {
      const result = await UserRepository.findById(id);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserService();
