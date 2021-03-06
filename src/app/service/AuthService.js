const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/AuthRepository');
const BadRequest = require('../errors/BadRequest');
let authConfig

class AuthService {
  async generateToken({ email, habilitado, _id }) {
    authConfig = process.env.SECRET
    return jwt.sign({ email, habilitado, _id }, authConfig, {
      expiresIn: 86400
    });
  }

  async login(credentials) {
    const user = await AuthRepository.login(credentials);

    if (!user) {
      throw new BadRequest(`Email or PassWord -> Invalid!`);
    }

    user.senha = undefined;

    const { habilitado } = user;
    const { email } = user;
    const { _id } = user;

    const result = { token: await this.generateToken({ email, habilitado, _id }) };

    return result;
  }
}

module.exports = new AuthService();
