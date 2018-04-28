const semestersModel = require('../models/semesters');

module.exports.getAll = (req, res) => {
  semestersModel.getAll((error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  semestersModel.add(body, (error, rows) => {
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

  semestersModel.remove(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  semestersModel.edit(body, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  semestersModel.getById(id, (error, rows) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(rows);
    }
  });
};

