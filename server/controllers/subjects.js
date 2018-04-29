const subjectsModel = require('../models/subjects');

module.exports.getAll = (req, res) => {
  subjectsModel.getAll((error, subjects) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(subjects);
    }
  });
};

module.exports.getById = (req, res) => {
  const { id } = req.params;

  subjectsModel.getById(id, (error, subjects) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(subjects);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  subjectsModel.edit(body, (error, subjects) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(subjects);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  subjectsModel.add(body, (error, subjects) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(subjects);
    }
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  subjectsModel.remove(id, (error, subjects) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(subjects);
    }
  });
};
