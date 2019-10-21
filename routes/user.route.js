const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/login', user_controller.login);
router.post('/register', user_controller.createUser);
router.get('/activated/:id', user_controller.verifyAccount);
router.get('/info/:id', user_controller.getInformation);
module.exports = router;