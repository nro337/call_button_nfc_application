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

exports.create = (req, res) => {
    // Validate request
    //console.log(req.body);
    //console.log(res)
    if (!req.body.status) {
        return res.status(400).send({
            message: "Review content can not be empty"
        });
    }

    // Create a Request
    // const request = new patient_requests({
    //     title: req.body.title || "Untitled Review",
    //     content: req.body.content,
    //     movie: req.body.movie,
    //     rating: req.body.rating,
    // });

    const request = new patient_requests(req.body)
    // console.log(request);
    // console.log(req.body.msg_payload)

    // Save Request in the database
    request.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Review."
            });
        });
}

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.status) {
        return res.status(400).send({
            message: "Request content can not be empty"
        });
    }

    // Find request and update it with the request body
    patient_requests.findByIdAndUpdate(req.params.message_id, {
        patient_id: req.body.patient_id,
        provider_id: req.body.provider_id,
        req_timestamp: new Date(Date.now()),
        status: req.body.status,
        message_id: req.body.message_id,
        msg_payload: [JSON.parse(req.body.msg_payload)],
    }, { new: true })
        .then(review => {
            if (!review) {
                return res.status(404).send({
                    message: "Request not found with id " + req.params.message_id
                });
            }
            res.send(review);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Request not found with id " + req.params.message_id
                });
            }
            return res.status(500).send({
                message: "Error updating request with id " + req.params.message_id
            });
        });
};


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