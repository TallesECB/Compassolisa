const UserSchema = require('../schema/UserSchema');

class UserRepository  {
  async create(payload) {
    return UserSchema.create(payload);
  }
  async find() {
    return UserSchema.find();
  }
  async findById(id) {
    return UserSchema.findById(id);
  }
}

module.exports = new UserRepository();