const db = require("../models");
const Organization = db.organizations;
const config = require("../config/auth.config");

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userName) {
        res.status(400).send({
            message: "userName can not be empty!"
        });
        return;
    }
    const {
        userName,
        organizationName,
        email
    } = req.body;

    console.log(Organization);



    // Create a Tutorial
    const organization = new Organization({
        userName: userName,
        organizationName: organizationName,
        email: email,
        organizationId: +new Date(),

    });

    // Save Tutorial in the database
    organization.save(organization)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};