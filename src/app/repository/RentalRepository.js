const RentalSchema = require('../schema/RentalSchema');
const limitPagination = require('../errors/limitPagination');
const offsetPagination = require('../errors/offsetPagination');

class RentalRepository  {
  async create(payload) {
    return RentalSchema.create(payload);
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

    if(limit > 1000 && limit < 0) {
      throw new limitPagination(limit);
    }

    if(offset < 0) {
      throw new offsetPagination(offset);
    }

    return await RentalSchema.paginate(payloadFind, {offset, limit});
  }
  async getById(id) {
    return RentalSchema.findById(id);
  }
  async update(id, payload) {
    return RentalSchema.findByIdAndUpdate(id, payload, {new: true});
  }
  async remove(id) {
    return RentalSchema.findByIdAndRemove(id);
  }
}

module.exports = new RentalRepository();