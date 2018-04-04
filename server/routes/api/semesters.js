const router = require('express').Router();
const jwt = require('jsonwebtoken');
const semestersController = require('../../controllers/semesters');
const auth = require('../auth');
const secret = require('../../config/app').config.keys.secret;

// get all semesters
router.get('/', semestersController.getAll);

module.exports = router;
