const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
    host: config.mailTrap.domain,
    port: config.mailTrap.port,
    secure: false,
    auth: {
        user: config.mailTrap.user_name,
        pass: config.mailTrap.password
    }
});

module.exports = {
    transporter
}