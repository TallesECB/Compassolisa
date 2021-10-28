const UserSchema = require('../schema/UserSchema');

class AuthRepository {
    async login(credentials) {
        return await UserSchema.findOne(credentials)
    }
}

module.exports = new AuthRepository();