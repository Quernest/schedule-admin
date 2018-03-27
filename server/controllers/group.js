const groupModel = require('../models/group');

module.exports.getSchedule = (req, res) => {
  let schedule = [];
  let semester = {};
  let group = {};

  groupModel.getGroup(req.params.id, (err, rows) => {
    if (err) throw err;

    group = rows[0];

    groupModel.getSchedule(req.params.id, (err, rows) => {
      if (err) throw err;

      schedule = rows;

      groupModel.getSemester(req.params.id, (err, rows) => {
        if (err) throw err;

        semester = rows[0];

        res.send({
          group,
          semester,
          schedule,
        });
      });
    });
  });
};

module.exports.getSemester = (req, res) => {
  groupModel.getSemester(req.params.id, (err, rows) => {
    if (err) throw err;

    res.send({
      semesters: rows,
    });
  });
};

module.exports.getGroup = (req, res) => {
  groupModel.getGroup(req.params.id, (err, rows) => {
    if (err) throw err;

    res.send(rows[0]);
  });
};
