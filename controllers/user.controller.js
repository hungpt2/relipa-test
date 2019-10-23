const User = require('../models/user.model');
const utility = require('../common/utility');
const config = require('../config');
const userTools = require('../common/validator/user');

exports.authenticate = (token) => {
    User.findOne({ token, tokenExpired: {$lt: new Date()} }, (err, user) => {
        if (user) {
            return {
                email: user.email,
                role: user.role
            };
        } else return null
    })
}

exports.createUser = async (req, res) => {
    const checker = await userTools.userValidator(req.body);
    if (!checker.status) {
        res.status(400).send({
            message: checker.message
        })
        return
    }
    let user = new User(
        {
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            isVerified: false,
            verifyCode: utility.makeId(12),
            lifeTimeCode: new Date(new Date().getTime() + config.lifeTimeCode),
            role: req.body.role
        }
    );

    user.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({
            message: 'User Created successfully!!!',
            data: {
                email: req.body.email,
                role: req.body.role
            }
        })
    });

    utility.sendEmail(user);
};

exports.verifyAccount = (req, res) => {
    User.findOne({
        verifyCode: req.params.id,
        isVerified: false,
        lifeTimeCode: {$lt: new Date()}
    }, (err, user) => {
        if (!user) {
            res.status(400).send({
                message: 'Code invalid or expired !!!'
            })
        } else {
            User.findOneAndUpdate({
                _id: user._id
            }, {
                isVerified: true,
            },{
                new: true,
                upsert: true,
                useFindAndModify: false
            }, (err, user) => {
                res.status(200).send({
                    message: 'Account activated !!!',
                    user: {
                        email: user.email,
                        role: user.role,
                    }
                })
            });
        }
    })
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (user) {
            if (!user.isVerified) {
                res.status(400).send({
                    message: 'Account have NOT activated !!!'
                })
            }
            const token = utility.makeId(12);
            const tokenExpired = new Date(new Date().getTime() + config.lifeTimeCode);
            User.findOneAndUpdate({
                _id: user._id
            }, {
                token,
                tokenExpired,
            },{ new: true, upsert: true, useFindAndModify: false }, (err, user) => {
                res.status(200).send({
                    message: 'Login successful !!!',
                    data: {
                        email: user.email,
                        token,
                        tokenExpired,
                        role: user.role,
                        createdAt: user.createdAt
                    }
                });
            });
        } else {
            res.status(400).send({
                message: 'Email or Password invalid !!!'
            })
        }
    });
}

exports.getInformation = (req, res) => {
    User.findOne({
        token: req.params.id,
        tokenExpired: {$lt: new Date()}
    }, (err, user) => {
        if (!user) {
            res.status(400).send({
                message: 'Token invalid or expired !!!'
            })
        } else {
            res.status(200).send({
                message: 'Get Account successful !!!',
                user: {
                    email: user.email,
                    role: user.role,
                }
            })
        }
    })
}
