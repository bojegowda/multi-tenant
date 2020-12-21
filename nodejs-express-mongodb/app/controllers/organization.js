const db = require("../models");
const Organization = require("../models/organization")
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
        companyName,
        email,
        tenantId
    } = req.body;



    // Create a Tutorial
    const organization = new Organization({
        userName: userName,
        companyName: companyName,
        email: email,
        organizationId: +new Date(),
        tenantId: tenantId

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

exports.getOrganizations = async function (req, res) {


    try {
        let {
            limit,
            page,

        } = req.query;

        let organizations = await Organization.find().skip(+page > 0 ? ((page - 1) * +limit) : 0)
            .limit(+limit)
        let totalCount = await Organization.find().count()
        if (organizations) {
            res.status(200).send({
                message: 'found organizations Successfully',
                status: 'ok',
                organizations: organizations,
                totCount: totalCount
            })
        } else {
            res.status(204).send({
                message: 'No Organizations found',
                status: 'ok',
            })
        }

    } catch (err) {
        next(err)
    }
};

exports.updateUser = async function (req, res, next) {

    try {
        let detilsOfOrganization = await user.findByIdAndUpdate(req.body._id, {
            $set: {
                "companyName": req.body.companyName,
                "email": req.body.email,
            }
        })

        if (detilsofUser) {
            res.status(201).send({
                data: detilsofUser,
                status: 'success',
                message: "Successfully Updated"

            })
        } else {
            res.status(204).send({
                status: 'sorry',
            })
        }
    } catch (error) {
        next(error)
    }
}