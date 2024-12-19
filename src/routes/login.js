const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.post('/', loginController.loginPost);
router.get('/', loginController.loginGet);

module.exports = router;
