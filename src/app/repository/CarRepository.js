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

    const paginate = await CarSchema.paginate({payloadFind}, {offset, limit});

    const result = {
      veiculos: paginate.docs,
      total: paginate.totalDocs,
      limit: paginate.limit,
      offset: paginate.offset,
      offsets: parseInt(paginate.totalDocs) - parseInt(paginate.offset)
    }

    return result;
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