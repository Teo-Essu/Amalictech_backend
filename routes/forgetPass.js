const express = require('express');
const router = express.Router();
const forgetPassController = require('../controllers/forgetPassController');

router.post('/', forgetPassController.forgetPwd);

module.exports = router;