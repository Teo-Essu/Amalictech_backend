const generateOTP = require('../middleware/generateOTP');
const saveOTPToUser = require('../middleware/saveOTPtoUser');
const sendEmailToUser = require('../middleware/sendEmail');
const User = require('../model/User');


const forgetPwd = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email required.' });
    console.log(email);
    const oldUser = await User.findOne({ email: email }).exec();
    if (!oldUser) {
        return res.send("Email not found");
    }

    // const expirationTime = new Date();
    // expirationTime.setMinutes(expirationTime.getMinutes() + 5); // OTP expires in 5 minutes

    try {
        const otp = generateOTP(6);

        console.log("OTP:", otp);
        // console.log("Expires in:", expirationTime);
        // req.session.otp = otp;

        sendEmailToUser(email, "One Time Password", otp);
        // oldUser.otp.code = otp;
        // oldUser.otp.expires = expirationTime;

        console.log("here: ", oldUser._id);
        saveOTPToUser(oldUser._id, otp);

        // res.status(201).json({ 'success': `OTP sent to ${email}` });
        res.send(`Success: OTP sent to ${email}`);
        // const secret = process.env.ACCESS_TOKEN_SECRET + oldUser.password;
        // const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn:"5m"})
    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = { forgetPwd };