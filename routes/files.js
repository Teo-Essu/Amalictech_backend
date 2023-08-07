const express = require('express');
const router = express.Router();
const fileController = require('../controllers/filesController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(fileController.getAllFiles)
    .post(upload.single('file'), fileController.saveFile);

module.exports = router;