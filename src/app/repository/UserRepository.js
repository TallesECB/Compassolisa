const UserSchema = require('../schema/UserSchema');
const limitMaxPagination = require('../errors/limitMaxPagination')

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    if(!offset){
      offset = 1
    }
    if(!limit) {
      limit = 10
    }

    offset = parseInt(offset)
    limit = parseInt(limit)

    if(limit > 1000) {
      throw new limitMaxPagination(limit)
    }

    const total = await UserSchema.find(payloadFind).countDocuments();
    const usuarios = await UserSchema.find(payloadFind).skip(offset).limit(limit);
    const offsets = usuarios.length - offset

    const arrayReturn = {
      usuarios,
      total,
      limit,
      offset,
      offsets
    }
    
    return arrayReturn
  }
  async getById(id) {
    return UserSchema.findById(id);
  }
  async update(id, payload) {
    return UserSchema.findByIdAndUpdate(id, payload, {new: true})
  }
  async remove(id) {
    return UserSchema.findByIdAndRemove(id);
  }
}

module.exports = new UserRepository();