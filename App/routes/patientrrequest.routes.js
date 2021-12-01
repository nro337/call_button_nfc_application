const express = require('express');
let router = express.Router();
const requests = require('../controllers/patientrequest.controller.js');
const cors = require('cors');
// app.use(cors());
// app.options("*", cors());

router
  .route("/")
  .get(cors(), requests.findAll)
  .post(cors(), requests.create)

module.exports = router;

// module.exports = (app) => {
//   const requests = require('../controllers/patientrequest.controller.js');
//   const cors = require('cors');
//   app.use(cors());
//   app.options("*", cors());

//   // // Create a new Review
//   // app.post('/filmreviews', cors(), reviews.create);

//   // Retrieve all Reviews
//   // app.get('/patient-requests', cors(), requests.findAll);

//   // // Retrieve a single Review with reviewId
//   // app.get('/filmreviews/:reviewId', cors(), reviews.findOne);

//   // // Update a Review with reviewId
//   // app.put('/filmreviews/:reviewId', reviews.update);

//   // // Delete a Review with reviewId
//   // app.delete('/filmreviews/:reviewId', reviews.delete);
// }