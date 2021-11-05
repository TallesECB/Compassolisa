const CarSchema = require('../schema/CarSchema');
const limitPagination = require('../errors/limitPagination')
const offsetPagination = require('../errors/offsetPagination');

class CarRepository  {
  async create(payload) {
    return CarSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    if(!offset){
      offset = 1;
    }
    if(!limit) {
      limit = 10;
    }
    offset = parseInt(offset)-1;
    limit = parseInt(limit);

    if(limit > 1000) {
      throw new limitPagination(limit);
    }

    if(offset < 0) {
      throw new offsetPagination(offset);
    }

    const result = await CarSchema.paginate(payloadFind, {offset, limit});
    return result;
  }
  async getById(id) {
    return CarSchema.findById(id);
  }
  async update(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, {new: true});
  }
  async updateAcessory(idAcessory, payload) {
    const result = await CarSchema.findOneAndUpdate({_id: idAcessory}, payload,{returnOriginal: false, new: true});
    return result
  }
  async remove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();