const router = require('express').Router();
const jwt = require('jsonwebtoken');
const subjectsController = require('../../controllers/subjects');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all subjects
router.get('/', subjectsController.getAll);

// remove subject
router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return subjectsController.remove(req, res);
  });
});

module.exports = router;
