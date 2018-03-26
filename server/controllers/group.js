const groupController = require('../models/group');

module.exports.getLessonsById = (req, res) => {
  groupController.getLessonsById(req.params.id, (err, rows) => {
    if (err) throw err;

    const hardCode = {
      group: 'it-14-1',
      semester: {
        start: '02-01-2018',
        end: '25-05-2018',
        firstWeekType: 0,
      },
      events: rows,
    };

    res.send(hardCode);
  });
};
