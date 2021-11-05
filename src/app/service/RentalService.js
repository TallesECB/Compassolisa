const RentalRepository = require('../repository/RentalRepository');

const idNotFound = require('../errors/idNotFound');

class RentalService {
  async create(payload) {
    const result = await RentalRepository.create(payload);
    return result;
  }
  async getAll({offset, limit, ...payloadFind}) {
    const result = await RentalRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {
    const result = await RentalRepository.getById(id);
    if(!result) {
      throw new idNotFound(`Rental - ${id}`);
    } 
    return result
  }
  async update(id, payload) {
    if(!await RentalRepository.getById(id)) {
      throw new idNotFound(`Rental - ${id}`);
    }
    const result = await RentalRepository.update(id, payload);
    return result;
  }
  async remove(id) {
    if(!await RentalRepository.getById(id)) {
      throw new idNotFound(`Rental - ${id}`);
    } 
    const result = await RentalRepository.remove(id);
    return result;
  }
}

module.exports = new RentalService();
