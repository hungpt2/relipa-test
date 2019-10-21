const constant = require('../constant');
const Store = require('../../models/store.model');

exports.storeValidator = async function (store) {
    let result = {
        status: true,
        message: 'Store can be action!!!'
    }

    if (!store.name || store.name.length > constant.store.nameLength) {
        result = {
            status: false,
            message: 'Name error!!!'
        }
    }

    if (!store.description || store.description.length > constant.store.descriptionLength) {
        result = {
            status: false,
            message: 'Description error!!!'
        }
    }

    await Store.findOne({ 'name': store.name }, function (err, email) {
        if (email) {
            result = {
                status: false,
                message: `${store.name} has been created!!!`
            }
        }
    })

    return result
};
