const express = require('express');
const isAuthenticated = require('../common/auth-basic');
const router = express.Router();

const store_controller = require('../controllers/store.controller');

router.get('/', isAuthenticated,store_controller.getListStore);
router.post('/', isAuthenticated, store_controller.createStore);
router.put('/:id', isAuthenticated,store_controller.updateStore);
router.delete('/:id', isAuthenticated,store_controller.deleteStore);
module.exports = router;