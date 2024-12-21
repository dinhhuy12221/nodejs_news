const express = require('express');
const router = express.Router();

const sessionController = require('../app/controllers/SessionController');

router.get('/', sessionController.logout);

module.exports = router;
