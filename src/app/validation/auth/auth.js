const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({error: 'No Token Provided'});
    };

    const parts = authHeader.split(' ');
    if(!parts.length === 2) {
        return res.status(401).send({error: 'Token Error'});
    };

    const [ scheme, token ] = parts; //dentro da parts tem 'bearer' e 'token', a scheme vai atribuir o bearer e a token o token, pois e na ordem, 0 - 0, 1 - 1 

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: 'Token Invalid Format'});
    };

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Token Invalid'});

        req.email = decoded.email
        return next();
    });
};