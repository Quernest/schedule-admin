const groupsModel = require('../models/groups');

module.exports.getAll = (req, res) => {
  groupsModel.getAll((err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

module.exports.add = (req, res) => {
  const { body } = req;
  const { name } = body;

  groupsModel.add(name, (err, rows) => {
    if (err) throw err;

    // TODO: send message to client
    res.send(rows);
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  groupsModel.remove(id, (err, rows) => {
    if (err) throw err;

    // TODO: send message to client
    res.send(rows);
  });
};
