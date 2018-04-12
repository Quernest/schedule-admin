const scheduleModel = require('../models/schedule');

module.exports.add = (req, res) => {
  const { body } = req;

  scheduleModel.add(body, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  scheduleModel.getById(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};
