const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure you load env variables

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendTestMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'farshanakilliyanni@gmail.com',
      subject: 'OTP Test',
      text: 'This is a test message from ShopCart project.'
    });

    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
}

sendTestMail();
