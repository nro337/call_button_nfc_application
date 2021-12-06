const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema({
    // _id: {type: mongoose.Schema.Types.ObjectId, ref: "patient_requests"},
    staff_id: String,
    name: String,
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('staff', StaffSchema);