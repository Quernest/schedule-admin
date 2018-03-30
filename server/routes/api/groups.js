const router = require('express').Router();
const jwt = require('jsonwebtoken');
const groupsController = require('../../controllers/groups');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all avilable groups
router.get('/', groupsController.getAll);

// add group
router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return groupsController.add(req, res);
  });
});

// remove group
router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return groupsController.remove(req, res);
  });
});

module.exports = router;
