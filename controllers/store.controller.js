const storeTools = require('../common/validator/store');
const Store = require('../models/store.model');
const constant = require('../common/constant');

exports.getListStore = async (req, res) => {
    const pageSize = Math.max(1, req.query.pageSize ? req.query.pageSize : 10);
    const pageIndex = Math.max(0, req.query.pageIndex ? req.query.pageIndex : 0);
    const filter = {}

    if (req.query.name) {
        filter.name = {'$regex': req.query.name}
    }
    if (req.query.description) {
        filter.description ={'$regex': req.query.description}
    }
    Store.find(filter)
    .limit(pageSize)
    .skip(pageSize * pageIndex)
    .sort({
        name: 'asc'
    })
    .exec(function(err, events) {
        Store.countDocuments(filter).exec(function(err, count) {
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
    if (req.user.role !== constant.ADMIN_ROLE) {
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
            image: req.body.image,
            isActive: true
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
    if (req.user.role !== constant.ADMIN_ROLE) {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    const checker = await storeTools.editStoreValidator(req.params.id, req.body);
    if (!checker.status) {
        res.status(400).send({
            message: checker.message
        })
        return
    }

    Store.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true,
        upsert: true,
        useFindAndModify: false
    }, (err, store) => {
        res.status(200).send({
            message: 'The Store updated !!!',
            data: store
        })
    });

};

exports.deleteStore = async (req, res) => {
    if (req.user.role !== constant.ADMIN_ROLE) {
        res.status(400).send({
            message: 'Invalid Authentication Credentials'
        })
        return
    }

    console.log(req.params.id)

    Store.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    }, (err, store) => {
        console.log(err, store);
        res.status(200).send({
            message: 'The Store deleted !!!',
            data: store
        })
    });
};
