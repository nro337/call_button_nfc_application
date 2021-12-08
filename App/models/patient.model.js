const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    // _id: {type: mongoose.Schema.Types.ObjectId, ref: "patient_requests"},
    patient_id: String,
    name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('patient', PatientSchema);