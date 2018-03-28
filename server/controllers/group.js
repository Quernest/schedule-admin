const groupModel = require('../models/group');

module.exports.getAllData = (req, res) => {
  const data = {
    group: {},
    semesters: [],
  };

  groupModel.getGroup(req.params.id, (err, groups) => {
    if (err) throw err;

    if (groups && groups.length) {
      const [group] = groups;
      data.group = group;
    }

    groupModel.getSemesters(req.params.id, (err, semesters) => {
      if (err) throw err;

      if (semesters && semesters.length) {
        data.semesters = semesters.map(row => (Object.assign(row, { schedule: [] })));
      }

      groupModel.getSchedule(req.params.id, (err, rows) => {
        if (err) throw err;

        if (rows && rows.length) {
          rows.map((row) => {
            data.semesters.map((semester, i) => {
              if (row.semesterId === semester.id) {
                data.semesters[i].schedule.push(row);
              }
            })
          });
        }

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

module.exports.getSemesters = (req, res) => {
  groupModel.getSemesters(req.params.id, (err, rows) => {
    if (err) throw err;

    // test get current semester
    // let currentSemester;
    // let currentDate = new Date();
    //
    // rows.map(row => {
    //   const { start, end } = row;
    //
    //   if (start > currentDate && currentDate < end) {
    //     console.log(row);
    //   }
    // });
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
