const nodeMailer = require('nodemailer');
const {mailerEmail, mailerPass} = require('../config/mail.config');

function sendEmail(recipient, subject, message) {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
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

module.exports = {
  sendEmail
}
