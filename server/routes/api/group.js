const router = require('express').Router();
const groupController = require('../../controllers/group');

router.get('/:id', groupController.getLessonsById);

module.exports = router;
