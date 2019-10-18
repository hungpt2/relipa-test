const postMan = require('./email');
const User = require('../models/user.model');

exports.makeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.sendEmail = (user, successFunc, failFunc) => {
    postMan.transporter.sendMail({
        from: '"Shop Relipee 👻" <shopRelipees@relipasoft.com>',
        to: user.email,
        subject: '[Shop Relipee] Activate Email',
        text: `Hello ${user.email},`,
        html: `<b>Click <a href="${'localhost:4200/activated/' + user.verifyCode}">here</a> to active email!</b>`
    })
    .then(() => {
        if (successFunc) {
            successFunc()
        }
    })
    .catch(() => {
        if (failFunc) {
            failFunc()
        }
    });
}