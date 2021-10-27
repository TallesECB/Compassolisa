const UserSchema = require('../schema/UserSchema');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async getAll(payloadFind) {
    return UserSchema.find(payloadFind);
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