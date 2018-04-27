const jwt = require('jsonwebtoken');
const secret = require('../config/app').config.keys.secret;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader !== '') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

const auth = {
  required: verifyToken,
};

module.exports = auth;
