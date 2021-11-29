const FleetSchema = require('../schema/FleetSchema');

class FleetRepository {
  async create(payload) {
    return FleetSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return FleetSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id, rentalID) {
    return FleetSchema.findOne({ _id: id, id_locadora: rentalID });
  }

  async update(id, rentalID, payload) {
    return FleetSchema.findByIdAndUpdate({ _id: id, id_locadora: rentalID }, payload, { new: true });
  }

  async remove(id, rentalID) {
    return FleetSchema.findByIdAndRemove({ _id: id, id_locadora: rentalID });
  }
}

module.exports = new FleetRepository();
