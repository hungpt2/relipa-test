const User = require('../models/user.model');
const makeId = require('../common/utility');
const config = require('../config');
const userTools = require('../common/validator/user');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createUser = function (req, res) {
    userTools.userValidator(req.body);
    let user = new User(
        {
            email: req.body.email,
            password: req.body.password,
            creator: req.body.creator,
            createdAt: new Date(),
            isVerified: false,
            verifyCode: makeId(12),
            lifeTimeCode: new Date() + config.lifeTimeCode,
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).send('User Created successfully!!!')
    })
};
