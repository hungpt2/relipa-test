const express = require('express');
const router = express.Router();

const currency_controller = require('../controllers/currency.controller');

router.get('/', currency_controller.getCurrency);
module.exports = router;