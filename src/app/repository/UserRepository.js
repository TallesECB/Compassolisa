const UserSchema = require('../schema/UserSchema');
const Repository = require('./GenericRepository');

class UserRepository extends Repository {
  constructor() {
    super(UserSchema);
  }
}

module.exports = new UserRepository();
