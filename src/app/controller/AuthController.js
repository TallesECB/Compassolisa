const AuthService = require('../service/AuthService');
const { serializeErrors } = require('../serialize/errorSerialize');

class AuthController {
  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(201).json(result);
    } catch (erro) {
      console.log(erro)
      return res.status(erro.statusCode).send(serializeErrors(erro));
    }
  }
}

module.exports = new AuthController();
