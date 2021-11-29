const ReserveSchema = require('../schema/ReserveSchema');

class ReserveRepository {
  async create(payload) {
    return ReserveSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return ReserveSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id, rentalID) {
    return ReserveSchema.findById({ _id: id, id_locadora: rentalID });
  }

  async update(id, rentalID, payload) {
    return ReserveSchema.findByIdAndUpdate({ _id: id, id_locadora: rentalID }, payload, { new: true });
  }

  async remove(id, rentalID) {
    return ReserveSchema.findByIdAndRemove({ _id: id, id_locadora: rentalID });
  }
}

module.exports = new ReserveRepository();
