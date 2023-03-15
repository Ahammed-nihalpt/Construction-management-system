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

app.use('/company', companyRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => console.log(`App now listening on port ${port}`));
