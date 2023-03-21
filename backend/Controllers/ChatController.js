/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-console */

// const jwt = require('jsonwebtoken');
const ChatModel = require('../Models/ChatModel');

const createChat = async (sender, receiver, content) => {
  try {
    const senderChk = await ChatModel.findOne({ sender });
    if (senderChk) {
      // if sender is there
      const receiverchk = await ChatModel.findOne({ sender, receiver });
      if (receiverchk) {
        // if receiver is there
        await ChatModel.findOneAndUpdate(
          { sender },
          { $push: { message: { content } } }
        );
      } else {
        // if receiver is not there
        const newChat = new ChatModel({
          sender,
          receiver,
          message: [
            {
              content,
            },
          ],
        });
        await newChat.save();
      }
    } else {
      // if sender is not there
      const newChat = new ChatModel({
        sender,
        receiver,
        message: [
          {
            content,
          },
        ],
      });
      await newChat.save();
    }
  } catch (error) {
    console.log(error);
  }
};

// const getChatHistory = (req,res) => {
//   const {sender,reciver} = req.body;

// }
module.exports = {
  createChat,
};
