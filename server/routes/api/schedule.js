const router = require('express').Router();
const jwt = require('jsonwebtoken');
const scheduleController = require('../../controllers/schedule');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return scheduleController.add(req, res);
  });
});

router.use('/:id', scheduleController.getById);

module.exports = router;
