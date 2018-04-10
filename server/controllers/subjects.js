const subjectsModel = require('../models/subjects');

module.exports.getAll = (req, res) => {
  subjectsModel.getAll((err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  subjectsModel.add(body, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  subjectsModel.remove(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};
