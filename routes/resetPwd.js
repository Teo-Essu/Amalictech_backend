const express = require('express');
const router = express.Router();
const verifyOtpController = require('../controllers/verifyOtpController');

router.post('/', verifyOtpController.resetPwd);

module.exports = router;