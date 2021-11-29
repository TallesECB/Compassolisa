const UserSchema = require('../schema/UserSchema');
const Repository = require('./GenericRepository');

class UserRepository extends Repository {
  constructor() {
    super(UserSchema);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return UserSchema.paginate(payloadFind, { offset, limit });
  }
}

module.exports = new UserRepository();
