const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using your email service provider credentials
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: process.env.G_MAIL,
      pass: process.env.G_MAIL_PASS,
    },
  });
  
  // Function to send an email to the user's email address
  function sendEmailToUser(userEmail, subject, message) {
    const mailOptions = {
      from: process.env.G_MAIL, // Sender's email address
      to: userEmail, // Receiver's email address
      subject: subject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  module.exports = sendEmailToUser;
  