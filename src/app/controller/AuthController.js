const AuthService = require('../service/AuthService');

class AuthController {
  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(201).json(result);
    } catch (error) {
      const err = {
        description: error.description,
        name: error.name
      };
      return res.status(error.statusCode).send(err);
    }
  }
}

module.exports = new AuthController();
