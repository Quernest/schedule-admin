const router = require('express').Router();
const jwt = require('jsonwebtoken');
const semestersController = require('../../controllers/semesters');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all semesters
router.get('/', semestersController.getAll);

// add semester
router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return semestersController.add(req, res);
  });
});

// remove semester
router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return semestersController.remove(req, res);
  });
});

// edit semester
router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    return semestersController.edit(req, res);
  });
});

// get the semester by id
router.use('/:id', semestersController.getById);

module.exports = router;
