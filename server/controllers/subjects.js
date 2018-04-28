const subjectsModel = require('../models/subjects');

module.exports.getAll = (req, res) => {
  subjectsModel.getAll((error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  subjectsModel.getById(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  subjectsModel.edit(body, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  subjectsModel.add(body, (error, rows) => {
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

  subjectsModel.remove(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};
