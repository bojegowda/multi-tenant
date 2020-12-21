const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");



var getNamespace = require('continuation-local-storage').getNamespace;
var session = getNamespace('mySession');
exports.create = (req, res) => {
    // Validate request

    const User = require("../models/user")(session.get('tenant'))
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

    // Create a Tutorial
    const user = new User({
        userName: userName,
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(req.body.password, 8),
        userId: +new Date(),
        date_added: new Date()

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

exports.getUsers = async function (req, res) {


    try {
        let {
            limit,
            page,

        } = req.query;

        let users = await User.find().skip(+page > 0 ? ((page - 1) * +limit) : 0)
            .limit(+limit)
        let totalCount = await User.find().count()
        if (users) {
            res.status(200).send({
                message: ' users found Successfully',
                status: 'ok',
                users: users,
                totCount: totalCount
            })
        } else {
            res.status(204).send({
                message: 'No users found',
                status: 'ok',
            })
        }

    } catch (err) {
        next(err)
    }
};

exports.updateUser = async function (req, res, next) {
    try {
        let detilsofUser = await user.findByIdAndUpdate(req.body._id, {
            $set: {
                "email": req.body.email,
                "fullName": req.body.fullName,

            }
        })

        if (detilsofUser) {
            res.status(200).send({
                status: 'success',
                message: "User updated successfully"

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