module.exports = app => {

    const users = require('../controllers/user.js')
    const organizations = require('../controllers/organization')

    var router = require("express").Router();

    // Create a new User




    app.post('/api/users/create', users.create);
    app.post("/api/users/authenticate", users.authenticate);
    app.post('/api/organizations/create', organizations.create)
};