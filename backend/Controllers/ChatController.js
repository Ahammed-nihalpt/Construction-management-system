/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-console */

// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ChatModel = require('../Models/ChatModel');
const UserModel = require('../Models/UserModel');
const DesignationModel = require('../Models/DesignationModel');

const createChat = async (sender, receiver, content) => {
  console.log(content);
  try {
    const Chk = await ChatModel.findOne({ sender, receiver });
    if (Chk) {
      await ChatModel.findOneAndUpdate(
        { sender, receiver },
        { $inc: { unreadMessages: 1 } }
      );
      // if receiver is there
      await ChatModel.findOneAndUpdate(
        { sender, receiver },
        { $push: { message: { content } } }
      );
    } else {
      // if sender is not there
      const newChat = new ChatModel({
        sender,
        receiver,
        unreadMessages: 1,
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

const getUsersAndUreadedChat = async (req, res) => {
  try {
    const { userId, companyId } = req.body;
    const objectId = mongoose.Types.ObjectId(userId);

    const result = await UserModel.aggregate([
      {
        $match: { company_id: companyId },
      },
      {
        $unwind: '$users',
      },
      {
        $match: { 'users._id': { $ne: objectId } },
      },
      {
        $group: {
          _id: '$company_id',
          users: { $push: '$users' },
        },
      },
      {
        $lookup: {
          from: 'chats',
          let: { user_id: '$users._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$receiver', userId] },
                    { $eq: ['$sender', '$$user_id'] },
                  ],
                },
              },
            },
          ],
          as: 'unread_messages',
        },
      },
      // Project the fields you need
      {
        $project: {
          'users.name': 1,
          'users.contact': 1,
          'users.email': 1,
          'users.designation_id': 1,
          'users.image': 1,
          'users._id': 1,
          unread_messages: 1,
        },
      },
    ]);

    const unread = await ChatModel.aggregate([
      { $match: { receiver: objectId } },
      {
        $project: {
          _id: 0,
          sender: 1,
          unreadMessages: 1,
        },
      },
    ]);

    res.send({ success: true, data: result, unread });
  } catch (error) {
    res.send({ success: true, message: error.message });
  }
};

const getChatDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const docs = await DesignationModel.find({ company_id: id });
    if (!docs.length > 0) {
      throw new Error('no designation added');
    }
    res.send({ success: true, designation: docs });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getPreviousMessage = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const sendMessages = await ChatModel.find({ sender, receiver });
    const receivedMessage = await ChatModel.find({
      sender: receiver,
      receiver: sender,
    });
    res.send({
      success: true,
      sndMessage: sendMessages,
      receiveMessage: receivedMessage,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const clearUnread = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    await ChatModel.findOneAndUpdate(
      { sender, receiver },
      { unreadMessages: 0 }
    );
    res.send({ success: true, message: 'updated' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
module.exports = {
  createChat,
  getUsersAndUreadedChat,
  getChatDesignation,
  getPreviousMessage,
  clearUnread,
};
