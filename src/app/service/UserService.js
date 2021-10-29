const UserRepository = require('../repository/UserRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId');
const underAge = require('../errors/underAge');

const mongoose = require('mongoose');
const moment = require('moment');

class UserService {
  async create(payload) {
    const minAge = 18
    
    const years = moment().diff(moment(payload.data_nascimento, 'DD/MM/YYYY'), 'years', true)

    if(!years >= minAge) {
      throw new underAge(payload.nome)
    }
    
    const result = await UserRepository.create(payload);
    return result;
  }
  async getAll({offset, limit, ...payloadFind}) {
    const result = await UserRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new invalidObjectId(id);
    }

    const result = await UserRepository.getById(id);

    if(!result) {
      throw new idNotFound(`User - ${id}`);
    } 

    return result
  }
  async update(id, payload) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new invalidObjectId(id);
    }
    if(!await UserRepository.getById(id)) {
      throw new idNotFound(`User - ${id}`);
    }

    const minAge = 18
    const years = moment().diff(moment(payload.data_nascimento, 'DD-MM-YYYY'), 'years', true)

    if(!years >= minAge) {
      throw new underAge(payload.nome)
    } 

    const result = await UserRepository.create(payload);
    return result;
  }
  async remove(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      throw new invalidObjectId(id);
    }
    if(!await UserRepository.getById(id)) {
      throw new idNotFound(`User - ${id}`);
    } 

    const result = await UserRepository.remove(id);
    return result;
  }
}

module.exports = new UserService();
