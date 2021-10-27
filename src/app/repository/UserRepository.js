const UserSchema = require('../schema/UserSchema');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async find(payloadFind) {
    return UserSchema.find(payloadFind);
  }
  async findById(id) {
    return UserSchema.findById(id);
  }
  async findByIdAndUpdate(id, payload) {
    return UserSchema.findByIdAndUpdate(id, payload, {new: true})
  }
  async findByIdAndRemove(id) {
    return UserSchema.findByIdAndRemove(id);
  }
}

module.exports = new UserRepository();