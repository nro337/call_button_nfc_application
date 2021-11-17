const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({
    // _id: {type: mongoose.Schema.Types.ObjectId, ref: "patient_requests"},
    provider_id: String,
    provider_name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('providers', ProviderSchema);