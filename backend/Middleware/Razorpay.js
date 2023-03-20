/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

module.exports = instance;
