const locationsModel = require('../models/locations');

module.exports.getAll = (req, res) => {
  locationsModel.getAll((error, locations) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(locations);
    }
  });
};

module.exports.getById = (req, res) => {
  locationsModel.getById(req.params.id, (error, location) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(location);
    }
  });
};

module.exports.edit = (req, res) => {
  const { body } = req;

  locationsModel.edit(body, (error, locations) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(locations);
    }
  });
};

module.exports.add = (req, res) => {
  const { body } = req;

  locationsModel.add(body, (error, locations) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(locations);
    }
  });
};

module.exports.remove = (req, res) => {
  const { body } = req;
  const { id } = body;

  locationsModel.remove(id, (error, locations) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(locations);
    }
  });
};
