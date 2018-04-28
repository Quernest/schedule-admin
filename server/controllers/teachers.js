const teachersModel = require('../models/teachers');

module.exports.getAll = (req, res) => {
  teachersModel.getAll((error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.getById = (req, res) => {
  teachersModel.getById(req.params.id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  teachersModel.edit(body, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;
  const { name } = body;

  teachersModel.add(name, (error, rows) => {
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

  teachersModel.remove(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};
