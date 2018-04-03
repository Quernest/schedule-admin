const router = require('express').Router();
const jwt = require('jsonwebtoken');
const teachersController = require('../../controllers/teachers');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all teachers
router.get('/', teachersController.getAll);

// add teacher
router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return teachersController.add(req, res);
  });
});

// remove teacher
router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return teachersController.remove(req, res);
  });
});

module.exports = router;
