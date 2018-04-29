const scheduleModel = require('../models/schedule');

module.exports.add = (req, res) => {
  const { body } = req;

  scheduleModel.add(body, (error, schedule) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(schedule);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  scheduleModel.getById(id, (error, schedule) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(schedule);
    }
  });
};
