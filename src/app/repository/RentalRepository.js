const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    return RentalSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return RentalSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return RentalSchema.findById(id);
  }

  async update(id, payload) {
    return RentalSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return RentalSchema.findByIdAndRemove(id);
  }
}

module.exports = new RentalRepository();
