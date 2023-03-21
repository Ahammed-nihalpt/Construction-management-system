/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: [
      {
        content: { type: String, required: true },
        read: { type: String, required: true, default: false },
        date: { type: String, required: true, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
