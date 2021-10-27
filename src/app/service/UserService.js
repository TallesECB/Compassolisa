const UserRepository = require('../repository/UserRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')

const mongoose = require('mongoose');

class UserService {
  async create(payload) {
    const result = await UserRepository.create(payload);
    return result;
  }
  async getAll(payloadFind) {
    const result = await UserRepository.getAll(payloadFind);
    return result;
  }
  async getById(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const result = await UserRepository.getById(id);
      if(result) {
        return result;
      } else {
        throw new idNotFound(`User - ${id}`);
      } 
    } else {
      throw new invalidObjectId(id);
    }
  }
  async update(id, payload) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await UserRepository.getById(id)) {
        const result = await UserRepository.update(id, payload);
        return result;
      } else {
        throw new idNotFound(`User - ${id}`);
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
  async remove(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await UserRepository.getById(id)) {
        const result = await UserRepository.remove(id);
        return result;
      } else {
        throw new idNotFound(`User - ${id}`);
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
}

module.exports = new UserService();
