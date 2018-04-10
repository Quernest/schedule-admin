const router = require('express').Router();
const jwt = require('jsonwebtoken');
const subjectsController = require('../../controllers/subjects');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all subjects
router.get('/', subjectsController.getAll);

module.exports = router;
