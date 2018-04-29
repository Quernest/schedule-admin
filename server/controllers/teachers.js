const teachersModel = require('../models/teachers');

module.exports.getAll = (req, res) => {
  teachersModel.getAll((error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.getById = (req, res) => {
  teachersModel.getById(req.params.id, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  teachersModel.edit(body, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  teachersModel.add(body, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  teachersModel.remove(id, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};
