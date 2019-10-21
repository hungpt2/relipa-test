const express = require('express');
const isAuthenticated = require('../common/auth-basic');

const router = express.Router();

const currency_controller = require('../controllers/currency.controller');

router.get('/', isAuthenticated, currency_controller.getCurrency);
module.exports = router;