const storeTools = require('../common/validator/store');
const Store = require('../models/store.model');

exports.getListStore = async (req, res) => {
    console.log(req);
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
