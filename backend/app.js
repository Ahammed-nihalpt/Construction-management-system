/* eslint-disable import/order */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fileupload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
dotenv.config();
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

mongoose.connect('mongodb://localhost:27017/constructionManagementSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 9000;

const companyRouter = require('./Routes/CompnayRouter');
const userRouter = require('./Routes/UserRouter');
const adminRouter = require('./Routes/AdminRouter');
const chatRouter = require('./Routes/ChatRouter');

app.use('/company', companyRouter);
app.use('/backend/user', userRouter);
app.use('/backend/admin', adminRouter);
app.use('/backend/chat', chatRouter);

// eslint-disable-next-line import/no-extraneous-dependencies
const socketio = require('socket.io');
const { createChat } = require('./Controllers/ChatController');

const http = require('http').createServer(app);

const io = socketio(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  users[userId] = socket.id;
  console.log(`connected to ${userId}, with id ${socket.id}`);

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const uId in users) {
      if (users[uId] === socket.id) {
        delete users[uId];
        console.log(`User disconnected: ${uId}`);
        break;
      }
    }
  });

  socket.on('chat-message', (msg, rid, sid, date) => {
    createChat(sid, rid, msg);
    const recipientSocketId = users[rid];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('chat-message', { msg, date });
    }
  });
});

http.listen(port, () => console.log(`App now listening on port ${port}`));
