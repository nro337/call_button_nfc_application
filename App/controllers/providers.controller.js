const providers = require('../models/providers.model.js');

// Retrieve and return all patient requests from the database.
exports.findPSU = (req, res) => {
  providers.find()
  .then(provider => {
      res.send(provider);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving providers."
      });
  });
};