const mongoose = require('mongoose');

const { Schema } = mongoose;

const registrationSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  company_id: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  address: {
    office: { type: String },
    pincode: { type: Number },
    state: { type: String },
  },
  gst: {
    type: String,
    unique: true,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  Status: {
    type: String,
    default: 'Active',
  },
  image: {
    type: String,
    default: 'onimage',
  },
});

const Registration = mongoose.model('company', registrationSchema);

module.exports = {
  Registration,
};
