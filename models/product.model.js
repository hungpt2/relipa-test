const mongoose = require('mongoose');
const constant = require('../common/constant');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: constant.product.nameLength},
    storeId: {type: String, required: true},
    description: {type: String, max: constant.product.descriptionLength},
    price: {type: Number},
    img64: {type: Array},
    isActive: {type: Boolean},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);