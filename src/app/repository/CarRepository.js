const CarSchema = require('../schema/CarSchema');

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async getAll(payloadFind) {
    return CarSchema.find(payloadFind);
  }
  async getById(id) {
    return CarSchema.findById(id);
  }
  async update(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, {new: true})
  }
  async remove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();