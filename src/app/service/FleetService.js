const FleetRepository = require('../repository/FleetRepository');

const NotFound = require('../errors/NotFound');

class FleetService {
  async create(payload) {
    const result = await FleetRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await FleetRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id) {
    const result = await FleetRepository.getById(id);
    if (!result) {
      throw new NotFound(`Fleet - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await FleetRepository.getById(id))) {
      throw new NotFound(`Fleet - ${id}`);
    }

    const result = await FleetRepository.update(id, payload);
    return result;
  }

  async remove(id) {
    if (!(await FleetRepository.getById(id))) {
      throw new NotFound(`Fleet - ${id}`);
    }

    const result = await FleetRepository.remove(id);
    return result;
  }
}

module.exports = new FleetService();
