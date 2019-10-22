const storeTools = require('../common/validator/store');
const Store = require('../models/store.model');

exports.getListStore = async (req, res) => {
    const pageSize = Math.max(1, req.body.pageSize ? req.body.pageSize : 10);
    const pageIndex = Math.max(0, req.body.pageIndex ? req.body.pageSize : 0);
    const filter = {}

    if (req.body.name) {
        filter.name = req.body.name
    }
    if (req.body.description) {
        filter.description = req.body.description
    }
    Store.find(filter)
    .limit(pageSize)
    .skip(pageSize * pageIndex)
    .sort({
        name: 'asc'
    })
    .exec(function(err, events) {
        Store.count().exec(function(err, count) {
            if (err) {
                res.status(400).send({
                    data: err
                })
            }
            res.status(200).send({
                message: `Get list store successfully!!!`,
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

exports.createStore = async (req, res) => {
    if (req.user.role !== '1') {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    const checker = await storeTools.storeValidator(req.body);
    if (!checker.status) {
        res.status(400).send({
            message: checker.message
        })
        return
    }
    let store = new Store(
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        }
    );

    store.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).send({
            message: `${store.name} Created successfully!!!`,
            data: store
        })
    });
};

exports.updateStore = async (req, res) => {
    console.log(req);
};

exports.deleteStore = async (req, res) => {
    console.log(req);
};
