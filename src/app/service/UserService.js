const UserRepository = require('../repository/UserRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')
const underAge = require('../errors/underAge')

const mongoose = require('mongoose');
const moment = require('moment')

class UserService {
  async create(payload) {
    const minAge = 18
    let isValidDate = false
    
    const years = moment().diff(moment(payload.data_nascimento, 'DD/MM/YYYY'), 'years', true)

    if(years >= minAge) {
      isValidDate = true
    }
   
    if(isValidDate) {
      const result = await UserRepository.create(payload);
      return result;
    } else {
      throw new underAge(payload.nome)
    }
  }
  async getAll({offset, limit, ...payloadFind}) {
    const result = await UserRepository.getAll(payloadFind, offset, limit);
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
        const minAge = 18
        let isValidDate = false
        
        const years = moment().diff(moment(payload.data_nascimento, 'DD-MM-YYYY'), 'years', true)
    
        if(years >= minAge) {
          isValidDate = true
        }
       
        if(isValidDate) {
          const result = await UserRepository.create(payload);
          return result;
        } else {
          throw new underAge(payload.nome)
        }
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
