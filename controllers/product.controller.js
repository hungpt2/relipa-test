const productTools = require('../common/validator/product');
const Product = require('../models/product.model');
const constant = require('../common/constant');

exports.getListProduct = async (req, res) => {
    const filter = {}
    if (req.query.storeId) {
        filter.storeId = req.query.storeId
    } else {
        res.status(400).send({
            message: 'Store Id required!!!'
        })
    }
    if (req.query.name) {
        filter.name = {'$regex': req.query.name}
    }
    if (req.query.description) {
        filter.description ={'$regex': req.query.description}
    }

    const pageSize = Math.max(1, req.query.pageSize ? req.query.pageSize : 10);
    const pageIndex = Math.max(0, req.query.pageIndex ? req.query.pageIndex : 0);
    
    Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * pageIndex)
    .sort({
        name: 'asc'
    })
    .exec(function(err, events) {
        Product.countDocuments(filter).exec(function(err, count) {
            if (err) {
                res.status(400).send({
                    data: err
                })
            }
            res.status(200).send({
                message: `Get list product successfully!!!`,
                data: events,
                paginator: {
                    pageIndex,
                    pageSize,
                    totalItem: count,
                }
            })
        })
    })
};

exports.createProduct = async (req, res) => {
    if (req.user.role !== constant.ADMIN_ROLE) {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    const checker = await productTools.createProductValidator(req.body);
    if (!checker.status) {
        res.status(400).send({
            message: checker.message
        })
        return
    }
    let product = new Product(
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            storeId: req.body.storeId,
            isActive: true
        }
    );

    product.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({
            message: `${product.name} Created successfully!!!`,
            data: product
        })
    });
};

exports.updateProduct = async (req, res) => {
    if (req.user.role !== constant.ADMIN_ROLE) {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    const checker = await productTools.editProductValidator(req.params.id, req.body);
    if (!checker.status) {
        res.status(400).send({
            message: checker.message
        })
        return
    }

    Product.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true,
        upsert: true,
        useFindAndModify: false
    }, (err, product) => {
        res.status(200).send({
            message: 'The product updated !!!',
            data: product
        })
    });

};

exports.deleteProduct = async (req, res) => {
    if (req.user.role !== constant.ADMIN_ROLE) {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    Product.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    }, (err, product) => {
        res.status(200).send({
            message: 'The product deleted !!!',
            data: product
        })
    });
};
