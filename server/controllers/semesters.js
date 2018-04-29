const semestersModel = require('../models/semesters');

module.exports.getAll = (req, res) => {
  semestersModel.getAll((error, semesters) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(semesters);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  semestersModel.add(body, (error, semesters) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(semesters);
    }
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  semestersModel.remove(id, (error, semesters) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(semesters);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  semestersModel.edit(body, (error, semesters) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(semesters);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  semestersModel.getById(id, (error, semesters) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(semesters);
    }
  });
};

