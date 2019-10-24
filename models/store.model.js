const mongoose = require('mongoose');
const constant = require('../common/constant');
const Schema = mongoose.Schema;

let StoreSchema = new Schema({
    name: {type: String, required: true, max: constant.store.nameLength},
    description: {type: String, max: constant.store.descriptionLength},
    image: {type: Array},
    isActive: {type: Boolean}
});

// Export the model
module.exports = mongoose.model('Store', StoreSchema);