const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const authConfig = require('../config/auth.json');
const AuthInvalid = require('../errors/AuthInvalid');

class AuthService {
  async generateToken({ email, habilitado }) {
    return jwt.sign({ email, habilitado }, authConfig.secret, {
      expiresIn: 86400
    });
  }

  async login(credentials) {
    const user = await AuthRepository.login(credentials);

    if (!user) {
      throw new AuthInvalid();
    }

    user.senha = undefined;

    const { habilitado } = user;
    const { email } = user;

    const result = { token: await this.generateToken({ email, habilitado }) };

    return result;
  }
}

module.exports = new AuthService();
