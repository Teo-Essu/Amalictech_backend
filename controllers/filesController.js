const Files = require('../model/Files');
const cloudinary = require('../middleware/cloudinaryConfig');
const fs = require('fs');
const { File } = require('buffer');
// const multer = require('multer');


// const upload = multer({ dest: 'uploads/' });

const getAllFiles = async (req, res) => {
    const files = await Files.find();
    if (!files) return res.status(204).json({ 'message': 'No files found' });
    res.json(files);
}

const saveFile = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ 'message': 'Title and description required.' });
    if (!req.file) return res.status(400).send('No file uploaded.');
    // console.log(req.file);

    try {
        const fileData = {
            title,
            description,
        };

        // Upload the file to Cloudinary
        var result = '';
        if (req.file.mimetype == 'application/pdf') {
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'raw' });
        } else {
            result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });
        };


        // Add Cloudinary URL to the file data
        // console.log("Cloudinary: ", result);
        fileData.cloudinaryUrl = result.secure_url;
        fileData.publicId = result.public_id;

        // Create a new file object in the database
        const newFile = await Files.create(fileData);

        //Delete upload from server
        fs.unlinkSync(req.file.path);

        res.status(200).json(newFile);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    saveFile,
    getAllFiles
};