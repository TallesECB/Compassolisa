const ReserveSchema = require('../schema/ReserveSchema');
const Repository = require('./GenericRepository');

class ReserveRepository extends Repository {
  constructor() {
    super(ReserveSchema);
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
