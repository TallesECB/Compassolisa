const AuthRepository = require('../repository/AuthRepository');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const authInvalid = require('../errors/authInvalid')

class AuthService {
  async login(credentials) {
    
    const user = await AuthRepository.login(credentials);

    if(!user) {
      throw new authInvalid()
    }

    user.senha = undefined;
    
    const habilitado = user.habilitado;
    const email = user.email;


    const token = jwt.sign({email, habilitado}, authConfig.secret,  {
      expiresIn: 86400,
    });
    
    const result = { token };
    
    return result;
  }
}

module.exports = new AuthService();
