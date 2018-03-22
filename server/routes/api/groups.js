const router = require('express').Router();
const groupsController = require('../../controllers/groups');

router.get('/', groupsController.getAllGroups);

module.exports = router;
