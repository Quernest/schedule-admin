const groupsModel = require('../models/groups');

module.exports.getAllGroups = (req, res) => {
  groupsModel.getAllGroups((err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};
