const router = require('express').Router();
const jwt = require('jsonwebtoken');
const subjectsController = require('../../controllers/subjects');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', subjectsController.getAll);

router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    subjectsController.remove(req, res);
  });
});

router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    subjectsController.edit(req, res);
  });
});

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    subjectsController.add(req, res);
  });
});

router.use('/:id', subjectsController.getById);

module.exports = router;
