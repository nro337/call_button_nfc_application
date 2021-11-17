const mongoose = require('mongoose');

const PatientRequestSchema = mongoose.Schema({
    patient_id: String,
    provider_id: String,
    req_timestamp: Date,
    status: String,
    message_id: String,
    msg_payload: []
}, {
    timestamps: true
});

module.exports = mongoose.model('patient_requests', PatientRequestSchema);

// mongoose.connection.db.listCollections().toArray((err, collections) => {
//   console.log(collections);
// })