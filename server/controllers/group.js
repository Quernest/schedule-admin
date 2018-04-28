const groupModel = require('../models/group');

module.exports.getAllData = (req, res) => {
  const data = {
    group: {},
    semesters: [],
  };

  const { id } = req.params;

  groupModel.getGroup(id, (groupsError, groups) => {
    if (groupsError) {
      return res.status(400).send({ error: groupsError });
    }

    if (groups && groups.length) {
      const [group] = groups;

      data.group = group;
    }

    groupModel.getSemesters(id, (semestersError, semesters) => {
      if (semestersError) {
        return res.status(400).send({ error: semestersError });
      }

      if (semesters && semesters.length) {
        data.semesters = semesters.map((row) => Object.assign(row, { schedule: [] }));
      }

      groupModel.getSchedule(id, (scheduleError, schedule) => {
        if (scheduleError) {
          return res.status(400).send({ error: scheduleError });
        }

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

  groupModel.getSchedule(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.getSemesters = (req, res) => {
  const { id } = req.params;

  groupModel.getSemesters(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send({
        semesters: rows,
      });
    }
  });
};

module.exports.getGroup = (req, res) => {
  const { id } = req.params;

  groupModel.getGroup(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows[0]);
    }
  });
};
