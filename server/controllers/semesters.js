const semestersModel = require('../models/semesters');

module.exports.getAll = (req, res) => {
  semestersModel.getAll((err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  semestersModel.add(body, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  semestersModel.remove(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  semestersModel.edit(body, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  semestersModel.getById(id, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};

