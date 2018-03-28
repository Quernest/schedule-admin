const router = require('express').Router();
const groupController = require('../../controllers/group');

router.get('/:id/alldata', groupController.getAllData);
router.get('/:id/schedule', groupController.getSchedule);
router.get('/:id/plan', groupController.getSemesters);
router.get('/:id', groupController.getGroup);

module.exports = router;
