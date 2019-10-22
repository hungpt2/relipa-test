const constant = require('../constant');
const User = require('../../models/user.model');

exports.userValidator = async function (user) {
    let result = {
        status: true,
        message: 'User can be action!!!'
    }

    if (!user.email || !constant.emailRegexp.test(user.email) || user.email.length > constant.emailLength) {
        result = {
            status: false,
            message: 'Email error!!!'
        }
    }

    if (!user.password || !constant.passwordRegexp.test(user.password)) {
        result = {
            status: false,
            message: 'Password error!!!'
        }
    }

    const userDb = await User.findOne({ 'email': user.email })
    if (userDb) {
        result = {
            status: false,
            message: `${user.name} has been created!!!`
        }
    }

    return result
};
