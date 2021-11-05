const AuthRepository = require('../repository/AuthRepository');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const authInvalid = require('../errors/authInvalid')



class AuthService {
  async generateToken({email, habilitado}) {
    return jwt.sign({email, habilitado}, authConfig.secret,  {
      expiresIn: 86400,
    });
  }

  async login(credentials) {
    const user = await AuthRepository.login(credentials);

    if(!user) {
      throw new authInvalid();
    }

    user.senha = undefined;
    
    const habilitado = user.habilitado;
    const email = user.email;

    const result = { token: await this.generateToken({email, habilitado}) };

    return result;
  }
}

module.exports = new AuthService();
