const UserRepository = require('../repository/UserRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')

const mongoose = require('mongoose');

class UserService {
  async create(payload) {
    const result = await UserRepository.create(payload);
    return result;
  }
  async find(payloadFind) {
    const result = await UserRepository.find(payloadFind);
    return result;
  }
  async findById(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const result = await UserRepository.findById(id);
      if(result) {
        return result;
      } else {
        throw new idNotFound('User');
      } 
    } else {
      throw new invalidObjectId(id);
    }
  }
  async findByIdAndUpdate(id, payload) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await UserRepository.findById(id)) {
        const result = await UserRepository.findByIdAndUpdate(id, payload);
        return result;
      } else {
        throw new idNotFound('User');
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
  async findByIdAndRemove(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await UserRepository.findById(id)) {
        const result = await UserRepository.findByIdAndRemove(id);
        return result;
      } else {
        throw new idNotFound('User');
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
}

module.exports = new UserService();
