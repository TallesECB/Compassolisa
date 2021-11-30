const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./GenericRepository');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
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
