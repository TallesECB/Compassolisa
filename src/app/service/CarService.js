const CarRepository = require('../repository/CarRepository');

const idNotFound = require('../errors/idNotFound');
const invalidObjectId = require('../errors/invalidObjectId')
const withoutAccessory = require('../errors/withoutAccessory');

const mongoose = require('mongoose');

class CarService {
  async create(payload) {
    if(payload.acessorios.length == 0 || payload.acessorios.descricao == "") {
      throw new withoutAccessory(payload.modelo)
    } else {
      const result = await CarRepository.create(payload);
      return result;
    }
  }
  async getAll(payloadFind) {
    const result = await CarRepository.getAll(payloadFind);
    return result;
  }
  async getById(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const result = await CarRepository.getById(id);
      if(result) {
        return result;
      } else {
        throw new idNotFound(`Car - ${id}`);
      } 
    } else {
      throw new invalidObjectId(id);
    }
   
  }
  async update(id, payload) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await CarRepository.getById(id)) {
        const result = await CarRepository.update(id, payload);
        return result;
      } else {
        throw new idNotFound(`Car - ${id}`);
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
  async remove(id) { 
    if(mongoose.Types.ObjectId.isValid(id)) {
      if(await CarRepository.getById(id)) {
        const result = await CarRepository.remove(id);
        return result;
      } else {
        throw new idNotFound(`Car - ${id}`);
      }
    } else {
      throw new invalidObjectId(id);
    }
  }
}

module.exports = new CarService();
