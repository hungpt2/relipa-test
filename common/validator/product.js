const constant = require('../constant');
const Product = require('../../models/product.model');

exports.createProductValidator = async function (product) {
    let result = {
        status: true,
        message: 'Product can be action!!!'
    }

    if (!product.storeId) {
        result = {
            status: false,
            message: 'Store Id error!!!'
        }
        return result
    }

    if (!product.name || product.name.length > constant.product.nameLength) {
        result = {
            status: false,
            message: 'Name error!!!'
        }
    }

    if (!product.price) {
        result = {
            status: false,
            message: 'Price error!!!'
        }
    }

    if (!product.description || product.description.length > constant.product.descriptionLength) {
        result = {
            status: false,
            message: 'Description error!!!'
        }
    }

    const productDb = await Product.findOne({ 'name': product.name })

    if (productDb) {
        result = {
            status: false,
            message: `${product.name} has been created!!!`
        }
    }

    return result
};

exports.editProductValidator = async function (id, product) {
    if (!id) {
        result = {
            status: false,
            message: 'Id required!!!'
        }
        return result
    }

    const productDb = await Product.findOne({ '_id': id })

    let result = {
        status: true,
        message: 'product can be action!!!',
        data: productDb
    }

    if (!result.data) {
        result = {
            status: false,
            message: `The product invalid!!!`
        }
        return result
    }

    if (!product.storeId || product.storeId !== result.data.storeId) {
        result = {
            status: false,
            message: 'Store Id error!!!'
        }
    }

    if (!product.name || product.name.length > constant.product.nameLength) {
        result = {
            status: false,
            message: 'Name error!!!'
        }
    }

    if (!product.description || product.description.length > constant.product.descriptionLength) {
        result = {
            status: false,
            message: 'Description error!!!'
        }
    }

    if (!product.price) {
        result = {
            status: false,
            message: 'Price error!!!'
        }
    }

    return result
};
