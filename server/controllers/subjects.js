const subjectsModel = require('../models/subjects');

module.exports.getAll = (req, res) => {
  subjectsModel.getAll((err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
};
