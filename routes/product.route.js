const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

router.get('/', product_controller.test);
module.exports = router;