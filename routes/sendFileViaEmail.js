const express = require('express');
const router = express.Router();
const sendFileViaEmailController = require('../controllers/sendFileViaEmailController');

router.post('/', sendFileViaEmailController.sendFileViaEmail);

module.exports = router;