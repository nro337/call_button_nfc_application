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

// exports.create = (req, res) => {
//     var user
// }


// // Create and Save a new Review
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.content) {
//         return res.status(400).send({
//             message: "Review content can not be empty"
//         });
//     }

//     // Create a Review
//     const review = new Review({
//         title: req.body.title || "Untitled Review",
//         content: req.body.content,
//         movie: req.body.movie,
//         rating: req.body.rating,
//     });

//     // Save Review in the database
//     review.save()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Review."
//             });
//         });
// };