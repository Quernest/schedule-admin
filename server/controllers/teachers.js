const teachersModel = require('../models/teachers');

module.exports.getAll = (req, res) => {
  teachersModel.getAll((err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.add = (req, res) => {
  const { body } = req;
  const { name } = body;

  teachersModel.add(name, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  teachersModel.remove(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};
