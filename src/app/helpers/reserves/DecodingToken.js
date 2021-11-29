const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

class DecodingToken {
  async tokenDecoded(token) {
    const { _id, email, habilitado } = jwt.verify(token, authConfig.secret, (err, decoded) => decoded);

    return { _id, email, habilitado };
  }
}

module.exports = new DecodingToken();
