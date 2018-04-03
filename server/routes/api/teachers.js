const router = require('express').Router();
const jwt = require('jsonwebtoken');
const teachersController = require('../../controllers/teachers');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

router.get('/', teachersController.getAll);

// // get all avilable groups
// router.get('/', groupsController.getAll);

// // add group
// router.use('/add', auth.required, (req, res) => {
//   jwt.verify(req.token, secret, (err) => {
//     if (err) {
//       res.sendStatus(403);
//       res.end();
//     }

//     return groupsController.add(req, res);
//   });
// });

// // remove group
// router.use('/remove', auth.required, (req, res) => {
//   jwt.verify(req.token, secret, (err) => {
//     if (err) {
//       res.sendStatus(403);
//       res.end();
//     }

//     return groupsController.remove(req, res);
//   });
// });

module.exports = router;
