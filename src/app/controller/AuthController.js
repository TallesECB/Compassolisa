const AuthService = require('../service/AuthService');

class AuthController  {
  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(201).json(result);
    } catch(error) {
      res.status(error.statusCode).send(error.message)
    }
  }
}

module.exports = new AuthController();