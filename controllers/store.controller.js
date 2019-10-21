const storeTools = require('../common/validator/store');

exports.getListStore = async (req, res) => {
    console.log(req);
};

exports.createStore = async (req, res) => {
    // TODO: check auth

    const checker = await storeTools.userValidator(req.body);
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
