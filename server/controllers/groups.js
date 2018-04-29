const groupsModel = require('../models/groups');

module.exports.getAll = (req, res) => {
  groupsModel.getAll((error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  groupsModel.getById(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  groupsModel.add(body, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  groupsModel.edit(body, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  groupsModel.remove(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};
