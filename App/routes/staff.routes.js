const express = require('express');
let router = express.Router();
const staff = require('../controllers/staff.controller.js')
const cors = require('cors');
// app.use(cors());
// app.options("*", cors());

router
  .route("/")
  .get(cors(), staff.findStaff);

module.exports = router;