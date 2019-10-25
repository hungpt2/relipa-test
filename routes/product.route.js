const express = require('express');
const isAuthenticated = require('../common/auth-basic');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

router.get('/', isAuthenticated,product_controller.getListProduct);
router.get('/:id', isAuthenticated,product_controller.getProductById);
router.post('/create', isAuthenticated, product_controller.createProduct);
router.put('/edit/:id', isAuthenticated,product_controller.updateProduct);
router.delete('/delete/:id', isAuthenticated,product_controller.deleteProduct);

module.exports = router;