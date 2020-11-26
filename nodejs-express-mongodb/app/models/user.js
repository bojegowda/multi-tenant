const {
    tenantModel
} = require('../lib/multiTenant');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: String,
    fullName: String,
    email: String,
    password: String,
    userId: String,
}, {
    timestamps: true
});

module.exports = tenantModel('user', User);