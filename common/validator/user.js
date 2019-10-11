const constant = require('../constant');

exports.userValidator = function (user) {
    switch (user) {
        case user.email && constant.emailRegexp.test(user.email) && user.email.length <= 100:
            return {
                status: false,
                message: 'Email error!!!'
            }

        case user.password && constant.lowestCase.test(user.email) && constant.emailRegexp.test(user.email) && constant.emailRegexp.test(user.email):
            return {
                status: false,
                message: 'Password error!!!'
            }

        case user.creator && constant.emailRegexp.test(constant.emailToValidate) && user.creator.length <= 100:
            return {
                status: false,
                message: 'Creator error!!!'
            }
    
        default:
            return {
                status: true,
                message: 'User can be action!!!'
            };
    }
};
