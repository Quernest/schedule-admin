const groupModel = require('../models/group');

module.exports.getAllData = (req, res) => {
  const data = {
    group: {},
    semester: {},
    schedule: [],
  };

  groupModel.getGroup(req.params.id, (err, rows) => {
    if (err) throw err;

    const [group] = rows;
    data.group = group;

    groupModel.getSemester(req.params.id, (err, rows) => {
      if (err) throw err;

      const [semester] = rows;

      data.semester = semester;
      groupModel.getSchedule(req.params.id, (err, rows) => {
        if (err) throw err;

        data.schedule = rows;
        res.send(data);
      });
    });
  });
};

module.exports.getSchedule = (req, res) => {
  groupModel.getSchedule(req.params.id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
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
