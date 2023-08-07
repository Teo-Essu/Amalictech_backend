// const { sub } = require("date-fns");
const sendEmailToUser = require("../middleware/sendEmail");
const Files = require("../model/Files");

let sendNum = 0;

const sendFileViaEmail = async (req, res) => {
    const { email, subject } = req.body;
    if (!email || !subject) return res.status(400).json({ 'message': 'Email and subject required.' });

    const cloudinaryUrl = req.query.url;
    if (!cloudinaryUrl) return res.status(400).json({ 'message': 'query url required.' });
    // console.log(cloudinaryUrl);
    try {
        sendEmailToUser(email, subject, cloudinaryUrl);
        sendNum++;//increment number of sends
        console.log("sendNum: ", sendNum);
        await Files.updateOne({cloudinaryUrl: cloudinaryUrl},{ $set: { sendNum: sendNum } });//storing sendNum in database

        res.send(`Success: File link sent to ${email}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { sendFileViaEmail };