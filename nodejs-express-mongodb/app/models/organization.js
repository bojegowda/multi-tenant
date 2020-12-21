const mongoose = require('mongoose');

const Organization = new mongoose.Schema({
    userName: String,
    companyName: String,
    email: String,
    organizationId: String,
    tenantId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('organization', Organization);