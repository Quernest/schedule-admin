const router = require('express').Router();
const jwt = require('jsonwebtoken');
const semestersController = require('../../controllers/semesters');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', semestersController.getAll);

router.use('/add', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    semestersController.add(req, res);
  });
});

router.use('/remove', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    semestersController.remove(req, res);
  });
});

router.use('/edit', auth.required, (req, res) => {
  jwt.verify(req.token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
      res.end();
    }

    semestersController.edit(req, res);
  });
});

router.use('/:id', semestersController.getById);

module.exports = router;
