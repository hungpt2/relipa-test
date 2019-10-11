const mongoose = require('mongoose');
const constant = require('../common/constant');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: constant.emailLength},
    password: {type: String, required: true, min: constant.passwordMin, max: constant.passwordMax},
    creator: {type: String, required: true, max: constant.emailLength},
    createdAt: {type: Date, required: true},
    isVerified: {type: Boolean, required: true},
    verifyCode: {type: String},
    lifeTimeCode: {type: Date},
});


// Export the model
module.exports = mongoose.model('User', UserSchema);