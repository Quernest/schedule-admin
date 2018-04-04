const semestersModel = require('../models/semesters');

module.exports.getAll = (req, res) => {
  semestersModel.getAll((err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};
