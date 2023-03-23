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
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/chat', chatRouter);

// app.listen(port, () => console.log(`App now listening on port ${port}`));

// eslint-disable-next-line import/no-extraneous-dependencies
const socketio = require('socket.io');
const { createChat } = require('./Controllers/ChatController');

const http = require('http').createServer(app);

const io = socketio(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {});

  socket.on('chat message', (msg, rid, sid) => {
    console.log(`Message: ${msg}-${sid}-${rid}`);
    createChat(sid, rid, msg);
    const receiverRoom = io.sockets.adapter.rooms.get(rid);
    if (receiverRoom) {
      io.to(receiverRoom).emit('message');
    }
  });
});

http.listen(port, () => console.log(`App now listening on port ${port}`));
