const router = require('express').Router();
const jwt = require('jsonwebtoken');
const groupsController = require('../../controllers/groups');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', groupsController.getAll);

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    groupsController.add(req, res);
  });
});

router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    groupsController.edit(req, res);
  });
});

router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    groupsController.remove(req, res);
  });
});

router.use('/:id', groupsController.getById);

module.exports = router;
