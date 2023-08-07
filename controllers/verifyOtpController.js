const User = require('../model/User');
const bcrypt = require('bcrypt');

var myOtp = "";
const verifyOTP = async (req, res) => {
    const { codet } = req.body;
    if (!codet) return res.status(400).json({ 'message': 'OTP required.' });
    const storedOTP = await User.findOne({ code: codet }).exec();

    if (!storedOTP) {
        return res.send("OTP not found");
    }

    console.log('StoredOtp: ', storedOTP.otp.code);

    if (codet === storedOTP.otp.code) {
        myOtp = codet;//setting valid otp to universal myOtp
        console.log("MyOtp: ", myOtp);
        res.status(200).json({ "message": 'OTP is valid!' });

    } else {
        res.status(400).json({ "message": 'Invalid OTP!' });
    }
}

const resetPwd = async (req, res) => {
    const { pwd } = req.body;
    if (!pwd) return res.status(400).json({ 'message': 'Password required.' });

    const verifiedUser = await User.findOne({ code: myOtp }).exec();
    if (!verifiedUser) {
        return res.send("VerifiedUser not found");
    }

    try {

        const hashedPwd = await bcrypt.hash(pwd, 10);
        verifiedUser.password = hashedPwd;
        verifiedUser.otp.code = null;
        verifiedUser.otp.expires = null;
        const result = await verifiedUser.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).send(error.message);
    }

}

module.exports = { verifyOTP, resetPwd }