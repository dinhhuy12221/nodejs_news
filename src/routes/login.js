const express = require('express');
const router = express.Router();

const sessionController = require('../app/controllers/SessionController');

router.post('/', sessionController.loginPost);
router.get('/', sessionController.loginGet);

module.exports = router;
