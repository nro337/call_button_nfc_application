const express = require('express');
let router = express.Router();
const patient = require('../controllers/patient.controller.js')
const cors = require('cors');
// app.use(cors());
// app.options("*", cors());

router
  .route("/")
  .get(cors(), patient.findPatients);

module.exports = router;