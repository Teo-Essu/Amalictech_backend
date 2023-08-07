const User = require('../model/User'); // Adjust the path based on your project structure

// Generate the OTP and save it to the user model
function saveOTPToUser(userId, otp) {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 5); // OTP expires in 5 minutes

  User.findByIdAndUpdate(
    userId,
    {
      $set: {
        'otp.code': otp,
        'otp.expires': expirationTime,
      },
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.error('Error saving OTP to the user model:', error);
      } else {
        console.log('OTP saved to the user model:', updatedUser);
      }
    }
  );
}

module.exports = saveOTPToUser;