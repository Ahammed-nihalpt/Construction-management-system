/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  company_id: {
    type: String,
    required: true,
  },

  users: [
    {
      name: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      designation_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
