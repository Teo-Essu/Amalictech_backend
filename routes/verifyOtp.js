const express = require('express');
const router = express.Router();
const verifyOtpController = require('../controllers/verifyOtpController');

router.post('/', verifyOtpController.verifyOTP);

module.exports = router;