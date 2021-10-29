const CarSchema = require('../schema/CarSchema');
const limitMaxPagination = require('../errors/limitMaxPagination')

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    if(!offset){
      offset = 0;
    }
    if(!limit) {
      limit = 10;
    }

    offset = parseInt(offset);
    limit = parseInt(limit);

    if(limit > 1000) {
      throw new limitMaxPagination(limit);
    }

    const total = await CarSchema.find(payloadFind).countDocuments();
    const veiculos = await CarSchema.find(payloadFind).skip(offset).limit(limit);
    const offsets = total - offset;

    const arrayReturn = {
      veiculos,
      total,
      limit,
      offset,
      offsets
    };
    
    return arrayReturn;
  }
  async getById(id) {
    return CarSchema.findById(id);
  }
  async update(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, {new: true});
  }
  async remove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();