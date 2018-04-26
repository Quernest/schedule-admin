const groupModel = require('../models/group');

module.exports.getAllData = (req, res) => {
  const data = {
    group: {},
    semesters: [],
  };

  const { id } = req.params;

  groupModel.getGroup(id, (groupsError, groups) => {
    if (groupsError) throw groupsError;

    if (groups && groups.length) {
      const [group] = groups;

      data.group = group;
    }

    groupModel.getSemesters(id, (semestersError, semesters) => {
      if (semestersError) throw semestersError;

      if (semesters && semesters.length) {
        data.semesters = semesters.map((row) => Object.assign(row, { schedule: [] }));
      }

      groupModel.getSchedule(id, (scheduleError, schedule) => {
        if (scheduleError) throw scheduleError;

        if (schedule && schedule.length) {
          schedule.map((item) => {
            return data.semesters.map((semester, index) => {
              if (item.semesterId === semester.id) {
                data.semesters[index].schedule.push(item);
              }

              return semester;
            });
          });
        }

        res.send(data);
      });
    });
  });
};

module.exports.getSchedule = (req, res) => {
  const { id } = req.params;

  groupModel.getSchedule(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.getSemesters = (req, res) => {
  const { id } = req.params;

  groupModel.getSemesters(id, (err, rows) => {
    if (err) throw err;

    res.send({
      semesters: rows,
    });
  });
};

module.exports.getGroup = (req, res) => {
  const { id } = req.params;

  groupModel.getGroup(id, (err, rows) => {
    if (err) throw err;

    res.send(rows[0]);
  });
};
