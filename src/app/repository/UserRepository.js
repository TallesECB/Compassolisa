const UserSchema = require('../schema/UserSchema');
const limitMaxPagination = require('../errors/limitMaxPagination');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
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

    const paginate = await UserSchema.paginate(payloadFind, {offset, limit});

    const result = {
      usuarios: paginate.docs,
      total: paginate.totalDocs,
      limit: paginate.limit,
      offset: paginate.offset,
      offsets: parseInt(paginate.totalDocs) - parseInt(paginate.offset)
    }

    return result;
  }
  async getById(id) {
    return UserSchema.findById(id);
  }
  async update(id, payload) {
    return UserSchema.findByIdAndUpdate(id, payload, {new: true});
  }
  async remove(id) {
    return UserSchema.findByIdAndRemove(id);
  }
}

module.exports = new UserRepository();