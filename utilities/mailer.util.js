const nodeMailer = require('nodemailer');
const {mailerEmail, mailerPass} = require('../config/env.config');

function sendEmail(recipient, subject, message) {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      type: "login",
      user: mailerEmail,
      pass: mailerPass
    }
  });
  const mailOptions = {
    from: mailerEmail,
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

function sendEmailToSelf(subject, message) {
  const recipient = "andrewovertonportfolio@gmail.com";
  sendEmail(recipient, subject, message);
}

module.exports = {
  sendEmail,
  sendEmailToSelf
}
