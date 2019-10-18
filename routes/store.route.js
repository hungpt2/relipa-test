const express = require('express');
const router = express.Router();

const store_controller = require('../controllers/store.controller');

router.get('/', store_controller.getListStore);
router.post('/create', store_controller.createStore);
router.put('/edit/:id', store_controller.updateStore);
router.delete('/delete/:id', store_controller.deleteStore);
module.exports = router;