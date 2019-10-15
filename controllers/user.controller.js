const User = require('../models/user.model');
const utility = require('../common/utility');
const config = require('../config');
const userTools = require('../common/validator/user');


exports.createUser = async (req, res) => {
    const checker = await userTools.userValidator(req.body);
    if (!checker.status) {
        res.status(400).send({
            status: 400,
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
            lifeTimeCode: new Date().getTime() + config.lifeTimeCode,
        }
    );

    user.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({
            status: 200,
            message: 'User Created successfully!!!'
        })
    });

    utility.sendEmail(user);
};

exports.verifyAccount = (req, res) => {
    User.findOne({'verifyCode': req.params.id}, (err, user) => {
        const now = new Date().getTime();
        if (now > user.lifeTimeCode || user.isVerified) {
            res.status(400).send({
                status: 400,
                message: 'Code invalid or expired !!!'
            })
        } else {
            User.findOneAndUpdate({
                _id: user._id
            }, {
                isVerified: true
            },{
                new: true,
                upsert: true
            }, (err, user) => {
                res.status(200).send({
                    status: 200,
                    message: 'Account activated !!!'
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
        if (!user.isVerified) {
            res.status(400).send({
                status: 400,
                message: 'Account have NOT activated !!!'
            })
        }
        const token = utility.makeId(12);
        const tokenExpired = new Date().getTime() + config.lifeTimeCode;
        User.findOneAndUpdate({
            _id: user._id
        }, {
            token,
            tokenExpired,
        },{ new: true, upsert: true }, (err, user) => {
            res.status(200).send({
                status: 200,
                message: 'Login successful !!!',
                data: {
                    email: user.email,
                    token,
                    tokenExpired,
                    createdAt: user.createdAt
                }
            });
        });
    });
}
