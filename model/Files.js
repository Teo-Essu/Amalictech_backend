const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const currentDate = new Date();

const fileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cloudinaryUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        require: true
    },
    downloadNum: {
        type: Number,
        default: 0,
        require: true
    },
    sendNum: {
        type: Number,
        default: 0,
        require: true
    },
    timestamp: {
        type: String,
        default: moment(currentDate).format('DD-MM-YYYY HH:mm:ss')
    },
});

module.exports = mongoose.model('Files', fileSchema);