const patient_requests = require('../models/patientrequest.model.js');

// Retrieve and return all patient requests from the database.
exports.findAll = (req, res) => {
  patient_requests.find()
  .then(requests => {
      res.send(requests);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving requests."
      });
  });
};