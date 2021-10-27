const CarSchema = require('../schema/CarSchema');

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async find(payloadFind) {
    return CarSchema.find(payloadFind);
  }
  async findById(id) {
    return CarSchema.findById(id);
  }
  async findByIdAndUpdate(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, {new: true})
  }
  async findByIdAndRemove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();