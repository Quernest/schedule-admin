const locationsModel = require('../models/locations');

module.exports.getAll = (req, res) => {
  locationsModel.getAll((error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.getById = (req, res) => {
  locationsModel.getById(req.params.id, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  locationsModel.edit(body, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  locationsModel.add(body, (error, teachers) => {
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

  locationsModel.remove(id, (error, teachers) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(teachers);
    }
  });
};
