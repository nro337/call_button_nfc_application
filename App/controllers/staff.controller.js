const staff = require('../models/staff.model.js');

// Retrieve and return all patient requests from the database.
exports.findStaff = (req, res) => {
  staff.find()
  .then(member => {
      res.send(member);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving staff."
      });
  });
};