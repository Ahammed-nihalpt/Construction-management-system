const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mailTransporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  }),
};
