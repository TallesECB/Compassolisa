const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authConfig = process.env.SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ description: 'No Token Provided', name: 'Unauthorized' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ description: 'Token Error', name: 'Unauthorized' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ description: 'Token Invalid Format', name: 'Unauthorized' });
  }

  jwt.verify(token, authConfig, (err, decoded) => {
    if (err) return res.status(401).send({ description: 'Token Invalid', name: 'Unauthorized' });

    req.email = decoded.email;
    return next();
  });
  return res.status();
};
