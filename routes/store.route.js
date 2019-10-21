const express = require('express');
const isAuthenticated = require('../common/auth-basic');
const router = express.Router();

const store_controller = require('../controllers/store.controller');

router.get('/', store_controller.getListStore);
router.post('/', isAuthenticated, store_controller.createStore);
router.put('/:id', store_controller.updateStore);
router.delete('/:id', store_controller.deleteStore);
module.exports = router;