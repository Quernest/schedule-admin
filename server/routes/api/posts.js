const router = require('express').Router();
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.use('/', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err, data) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }
    res.json({
      message: 'Post created...',
      data,
    });
  });
});

module.exports = router;
