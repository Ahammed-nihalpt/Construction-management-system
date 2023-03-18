/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const PaymentSchema = new Schema({
  company_id: { type: ObjectId, required: true },
  user_id: { type: ObjectId, required: true },
  project_id: { type: ObjectId, required: true },
  amount: { type: Number, required: true },
  payment_for: { type: String, required: true },
  date: Date,
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
