const UserSchema = require('../schema/UserSchema');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async getAll(payloadFind, offset, limit) {
    offset = parseInt(offset)
    limit = parseInt(limit)
    const total = await UserSchema.find(payloadFind).countDocuments();
    const users = await UserSchema.find(payloadFind).skip(offset).limit(limit);
    const arrayReturn = {
      total,
      users,
      offset,
      limit
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