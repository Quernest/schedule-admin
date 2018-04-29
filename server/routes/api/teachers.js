const router = require('express').Router();
const jwt = require('jsonwebtoken');
const teachersController = require('../../controllers/teachers');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', teachersController.getAll);

router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    teachersController.edit(req, res);
  });
});

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    teachersController.add(req, res);
  });
});

router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    teachersController.remove(req, res);
  });
});

router.use('/:id', teachersController.getById);

module.exports = router;
