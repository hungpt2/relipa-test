const mongoose = require('mongoose');
const constant = require('../common/constant');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: {type: String},
    email: {type: String, required: true, max: constant.emailLength},
    password: {type: String, required: true, min: constant.passwordMin, max: constant.passwordMax},
    createdAt: {type: Date, required: true},
    isVerified: {type: Boolean, required: true},
    role: {type: String, required: true},
    verifyCode: {type: String},
    lifeTimeCode: {type: String},
    token: {type: String},
    tokenExpired: {type: String},
});

// Export the model
module.exports = mongoose.model('User', UserSchema);