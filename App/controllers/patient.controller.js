const patient = require('../models/patient.model.js');

// Retrieve and return all patient requests from the database.
exports.findPatients = (req, res) => {
  patient.find()
  .then(member => {
      res.send(member);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving patients."
      });
  });
};