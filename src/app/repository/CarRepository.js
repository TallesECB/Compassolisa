const { off } = require('../schema/CarSchema');
const CarSchema = require('../schema/CarSchema');

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    offset = parseInt(offset)
    limit = parseInt(limit)
    const total = await CarSchema.find(payloadFind).countDocuments();
    const cars = await CarSchema.find(payloadFind).skip(offset).limit(limit);
  
    const arrayReturn = {
      total,
      cars,
      offset,
      limit
    }
    
    return arrayReturn
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