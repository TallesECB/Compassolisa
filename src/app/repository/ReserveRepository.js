const ReserveSchema = require('../schema/ReserveSchema');

class ReserveRepository {
  async create(payload) {
    return ReserveSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return ReserveSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return ReserveSchema.findById(id);
  }

  async update(id, payload) {
    return ReserveSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return ReserveSchema.findByIdAndRemove(id);
  }
}

module.exports = new ReserveRepository();
