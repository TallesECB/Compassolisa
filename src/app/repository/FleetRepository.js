const FleetSchema = require('../schema/FleetSchema');

class FleetRepository {
  async create(payload) {
    return FleetSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return FleetSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return FleetSchema.findById(id);
  }

  async update(id, payload) {
    return FleetSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return FleetSchema.findByIdAndRemove(id);
  }
}

module.exports = new FleetRepository();
