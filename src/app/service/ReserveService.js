const ReserveRepository = require('../repository/ReserveRepository');

const NotFound = require('../errors/NotFound');

class FleetService {
  async create(payload) {
    const result = await ReserveRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await ReserveRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id) {
    const result = await ReserveRepository.getById(id);
    if (!result) {
      throw new NotFound(`Reserve - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await ReserveRepository.getById(id))) {
      throw new NotFound(`Reserve - ${id}`);
    }
  
    const result = await ReserveRepository.update(id, payload);
    return result;
  }

  async remove(id) {
    if (!(await ReserveRepository.getById(id))) {
      throw new NotFound(`Reserve - ${id}`);
    }
  
    const result = await ReserveRepository.remove(id);
    return result;
  }
}

module.exports = new FleetService();
