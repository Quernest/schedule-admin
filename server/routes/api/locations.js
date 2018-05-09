const router = require('express').Router();
const jwt = require('jsonwebtoken');
const locationsController = require('../../controllers/locations');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', locationsController.getAll);

router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    locationsController.edit(req, res);
  });
});

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    locationsController.add(req, res);
  });
});

router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    locationsController.remove(req, res);
  });
});

router.use('/:id', locationsController.getById);

module.exports = router;
