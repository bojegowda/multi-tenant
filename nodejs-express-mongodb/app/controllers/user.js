const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        fullName,
        password,
        email
    } = req.body;

    console.log(User);



    // Create a Tutorial
    const user = new User({
        userName: userName,
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(req.body.password, 8),
        userId: +new Date(),

    });

    // Save Tutorial in the database
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// authenticate
exports.authenticate = (req, res) => {
    User.findOne({
            userName: req.body.userName
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }

            if (!user) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                userName: user.userName,
                email: user.email,
                accessToken: token
            });
        });
};