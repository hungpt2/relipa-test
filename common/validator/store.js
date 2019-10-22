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

    const storeDb = await Store.findOne({ 'name': store.name })

    if (storeDb) {
        result = {
            status: false,
            message: `${store.name} has been created!!!`
        }
    }

    return result
};

exports.editStoreValidator = async function (id, store) {
    if (!id) {
        result = {
            status: false,
            message: 'Id required!!!'
        }
        return result
    }

    const storeDb = await Store.findOne({ '_id': id })

    let result = {
        status: true,
        message: 'Store can be action!!!',
        data: storeDb
    }

    if (!result.data) {
        result = {
            status: false,
            message: `The Store invalid!!!`
        }
        return result
    }

    if (!store.name || store.name !== storeDb.name) {
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

    return result
};
