const CarSchema = require('../schema/CarSchema');

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async find() {
    return CarSchema.find();
  }
  async findById(id) {
    return CarSchema.findById(id);
  }
}

module.exports = new CarRepository();