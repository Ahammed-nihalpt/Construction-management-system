/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const base64Img = require('base64-img');
const DesignationModel = require('../Models/DesignationModel');
const companyModel = require('../Models/CompanyModel');
const ProgressModel = require('../Models/ProgressModel');
const LabourModel = require('../Models/LabourListModel');
const UserModel = require('../Models/UserModel');
const ProjectModel = require('../Models/ProjectModel');
const PaymentModel = require('../Models/PaymentModel');

const userLogin = async (req, res) => {
  try {
    const { cmpid, password, email } = req.body;
    const cmpData = await companyModel.Registration.findOne({
      company_id: cmpid,
    });
    if (cmpData) {
      const userData = await UserModel.findOne({
        company_id: cmpData._id,
        users: { $elemMatch: { email, password } },
      });
      if (userData) {
        const user = userData.users.filter((value) => value.email === email);
        const reps = {
          // eslint-disable-next-line no-underscore-dangle
          id: user[0]._id,
          cmpid,
          emai: user[0].email,
          accountType: 'user',
        };
        const token = jwt.sign(reps, process.env.TOKEN_SECRET_key);
        res.send({
          success: true,
          message: 'user found',
          token,
          id: user[0]._id,
        });
      } else {
        throw new Error('User not found');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getSingleDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DesignationModel.findOne({ _id: id });
    if (!doc) {
      throw new Error('Designation not found');
    }
    res.send({ success: true, doc });
  } catch (error) {
    res.send({ success: true, message: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = await UserModel.findOne({ users: { $elemMatch: { _id: id } } });
    if (!obj) {
      throw new Error('User not found');
    }
    const userData = obj.users.filter((value) => value.id === id);
    res.send({ success: true, userData: userData[0] });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await ProjectModel.find({
      access: { $in: [id] },
    });

    res.send({ success: true, projects });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findById({ _id: id });
    if (!project) {
      throw new Error('No project found with given id');
    }
    res.send({ success: true, data: project });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

// eslint-disable-next-line no-unused-vars
const addProgress = async (req, res) => {
  try {
    const { progressData, size, id, userId, ...test } = req.body;
    const pData = JSON.parse(progressData);
    // const { ...image } = req.files;
    const check = await ProgressModel.findOne({ project_id: id });
    const currentDate = new Date();
    const updat = {
      date: `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`,
      by: userId,
      ...pData,
    };
    const already = await ProgressModel.find({
      project_id: id,
      progresses: {
        $elemMatch: {
          date: `${currentDate.getDate()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getFullYear()}`,
        },
      },
    });
    if (already.length > 0) {
      throw new Error('Only one progress per day');
    }
    if (check) {
      await ProgressModel.updateOne(
        { project_id: id },
        { $push: { progresses: updat } }
      );
    } else {
      const newProgress = new ProgressModel({
        project_id: id,
        progresses: [updat],
      });
      await newProgress.save();
    }
    const labourList = JSON.parse(test.labour);
    for (const element of labourList) {
      const filename = Date.now();
      base64Img.img(
        element.image,
        './Public/image/labour',
        `${filename}`,
        (err) => {
          if (err) throw err;
        }
      );
      const chekLabour = await LabourModel.find({ project_id: id });
      if (chekLabour.length > 0) {
        const checkDate = await LabourModel.find({
          list: {
            $elemMatch: {
              progress_date: `${currentDate.getDate()}-${
                currentDate.getMonth() + 1
              }-${currentDate.getFullYear()}`,
            },
          },
        });
        if (checkDate.length > 0) {
          const pushData = {
            image: filename,
            name: element.name,
            contact: element.contact,
          };
          await LabourModel.updateOne(
            {
              project_id: id,
              'list.progress_date': `${currentDate.getDate()}-${
                currentDate.getMonth() + 1
              }-${currentDate.getFullYear()}`,
            },
            { $push: { 'list.$.labour_list': pushData } }
          );
        } else {
          const newList = {
            progress_date: `${currentDate.getDate()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getFullYear()}`,
            labour_list: [
              {
                image: filename,
                name: element.name,
                contact: element.contact,
              },
            ],
          };
          await LabourModel.updateOne(
            { project_id: id },
            { $push: { list: newList } }
          );
        }
      } else {
        const newLabourList = new LabourModel({
          project_id: id,
          list: [
            {
              progress_date: `${currentDate.getDate()}-${
                currentDate.getMonth() + 1
              }-${currentDate.getFullYear()}`,
              labour_list: [
                {
                  image: filename,
                  name: element.name,
                  contact: element.contact,
                },
              ],
            },
          ],
        });
        await newLabourList.save();
      }
    }
    res.send({ success: true, message: 'progress added' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getAllProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const progress = await ProgressModel.findOne({ project_id: id }).sort({
      id: -1,
    });
    res.send({ success: true, docs: progress.progresses });
  } catch (error) {
    res.send({ success: true, message: error.message });
  }
};

const getProgressLabourList = async (req, res) => {
  try {
    const { date, id } = req.params;
    const list = await LabourModel.findOne({
      project_id: id,
      list: { $elemMatch: { progress_date: date } },
    });
    const sendList = list.list.filter((value) => value.progress_date === date);
    res.send({ success: true, docs: sendList[0].labour_list });
  } catch (error) {
    res.send({ success: true, message: error.message });
  }
};

const requestPayment = async (req, res) => {
  try {
    const { value, pid, uid } = req.body;
    const projectdetails = await ProjectModel.findOne({ id: pid });
    if (projectdetails.access.includes(uid)) {
      const cid = projectdetails.company_id;
      const Payment = new PaymentModel({
        company_id: cid,
        amount: value.amount,
        payment_for: value.for,
        project_id: pid,
        user_id: uid,
        date: Date(),
      });
      await Payment.save();
      res.send({ success: true, message: 'payment added successfully' });
    } else {
      throw new Error('Dont have access to this project');
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const { uid } = req.params;
    const objectId = mongoose.Types.ObjectId(uid);
    const payments = await PaymentModel.aggregate([
      {
        $match: { user_id: objectId },
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'project_id',
          foreignField: '_id',
          as: 'projects',
        },
      },
    ]);
    res.send({ success: true, payments });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const cancelPayment = async (req, res) => {
  try {
    const { payId } = req.body;
    await PaymentModel.findByIdAndUpdate(
      { _id: payId },
      { status: 'Cancelled' }
    );
    res.send({ success: true, message: 'Payment request cancelled' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = {
  userLogin,
  getUserData,
  getSingleDesignation,
  getUserProjects,
  getSingleProject,
  addProgress,
  getAllProgress,
  getProgressLabourList,
  requestPayment,
  cancelPayment,
  getPaymentHistory,
};
