
const cloudinary = require('../middleware/cloudinaryConfig');
const fs = require('fs');
const path = require('path');
const { default: axios } = require('axios');
const Files = require('../model/Files');

// let downloadNum = 0;

const downloadFile = async (req, res) => {

    try {
        // const publicId = req.params.publicId; // Replace 'CLOUDINARY_URL_HERE' with the actual Cloudinary URL of the file you want to download
        // const url = await Files.findOne({publicId: publicId});
        const cloudinaryUrl = req.query.url;

        if (!cloudinaryUrl) return res.status(400).json({ 'message': 'query url required.' });
        console.log(cloudinaryUrl);

        // Make a GET request to Cloudinary URL to get the file
        const response = await axios.get(cloudinaryUrl, { responseType: 'stream' });

        // Set the appropriate headers to trigger the file download on the client-side
        const fileName = path.basename(cloudinaryUrl);
        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-type', response.headers['content-type']);

        // downloadNum++;//Increment number of downloads
        // console.log("downloadNum: ", downloadNum);
        await Files.updateOne({cloudinaryUrl: cloudinaryUrl},{ $inc: { downloadNum: 1 } });//storing dowloadNum in database

        // Stream the file to the response
        response.data.pipe(res);
        // res.status(200).send('File downloaded successfully!');

    } catch (error) {
        console.error('Error downloading file from Cloudinary:', error);
        res.status(500).send('Error downloading file from Cloudinary.');
    }

}

module.exports = { downloadFile };