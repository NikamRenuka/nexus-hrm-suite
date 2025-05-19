
const nodemailer = require('nodemailer');

// This is a mock email service
// In a production environment, you would use a real SMTP service
const sendEmail = async (options) => {
  // Create a test account if in development
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASSWORD || testAccount.pass,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"HRMS Admin" <hrms@example.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  
  // Log email preview URL in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email preview:', nodemailer.getTestMessageUrl(info));
  }

  return info;
};

module.exports = { sendEmail };
