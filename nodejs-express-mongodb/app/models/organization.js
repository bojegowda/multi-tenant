const {
    tenantModel
} = require('../lib/multiTenant');
const mongoose = require('mongoose');

const Organization = new mongoose.Schema({
    userName: String,
    companyName: String,
    email: String,
    organizationId: String,
}, {
    timestamps: true
});

module.exports = tenantModel('organization', Organization);