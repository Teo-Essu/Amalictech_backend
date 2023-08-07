const crypto = require('crypto');

function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }
  
  module.exports = generateOTP
//   const otp = generateOTP(6); // Change the number inside the function to specify the OTP length you want (e.g., 6 digits)
//   console.log('OTP:', otp);