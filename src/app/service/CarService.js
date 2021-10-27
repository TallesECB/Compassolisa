const CarRepository = require('../repository/CarRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')
const notAcessory = require('../errors/notAcessory');

const mongoose = require('mongoose');

class CarService {
  async create(payload) {
    if(payload.acessorios.length == 0 || payload.acessorios.descricao == "") {
      throw new notAcessory(payload.modelo)
    } else {
      const result = await CarRepository.create(payload);
      return result;
    }
    
  }
  async find(payloadFind) {
    const result = await CarRepository.find(payloadFind);
    return result;
  }
  async findById(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const result = await CarRepository.findById(id);
      if(result) {
        return result;
      } else {
        throw new idNotFound('Car');
      } 
    } else {
      throw new invalidObjectId(id);
    }
   
  }
  async findByIdAndUpdate(id, payload) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await CarRepository.findById(id)) {
        const result = await CarRepository.findByIdAndUpdate(id, payload);
        return result;
      } else {
        throw new idNotFound('Car');
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
  async findByIdAndRemove(id) { 
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await CarRepository.findById(id)) {
        const result = await CarRepository.findByIdAndRemove(id);
        return result;
      } else {
        throw new idNotFound('Car');
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
}

module.exports = new CarService();
