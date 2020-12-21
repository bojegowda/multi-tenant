const {
    tenantModel
} = require('../lib/multiTenant');
const mongoose = require('mongoose');

function user(tenantId) {

    const UserSchema = new mongoose.Schema({
        userName: String,
        fullName: String,
        email: String,
        password: String,
        userId: String,
    });

    return mongoose.models['User_' + tenantId] || mongoose.model('User_' + tenantId, UserSchema)
}

module.exports = user