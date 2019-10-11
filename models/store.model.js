const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StoreSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: false, max: 200},
    address: {type: String, required: true},
    tel: {type: String, required: true},
    listProducts: {type: Array, required: false},
});


// Export the model
module.exports = mongoose.model('Store', StoreSchema);