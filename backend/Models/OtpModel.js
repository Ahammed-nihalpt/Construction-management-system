const mongoose = require('mongoose');

const { Schema } = mongoose;

const OTPVerificationSchema = new Schema({
  company_id: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const OTP = mongoose.model('OPT', OTPVerificationSchema);

module.exports = OTP;
