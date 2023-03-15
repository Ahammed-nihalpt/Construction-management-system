/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-console */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const companyModel = require('../Models/CompanyModel');
const otpModel = require('../Models/OtpModel');
const sendOtpMiddle = require('../Middleware/opt');
const ProjectModel = require('../Models/ProjectModel');
const ScheduleModel = require('../Models/ScheduleModel');
const DesignationModel = require('../Models/DesignationModel');
const UserModel = require('../Models/UserModel');

const randomID = () => {
  const random = Math.floor(Math.random() * 9000 + 1000);
  const id = `CMP${random}`;
  return id;
};

const Registration = async (req, res) => {
  const { name, address, pincode, state, phone, gst, email } = req.body;
  console.log(req.body);
  let id = randomID();
  const result = await companyModel.Registration.findOne({ company_id: id });
  if (result) {
    id = randomID();
  }
  // eslint-disable-next-line no-shadow
  const { Registration } = companyModel;
  const register = new Registration({
    company_name: name,
    email,
    phone,
    company_id: id,
    address: {
      office: address,
      pincode,
      state,
    },
    gst,
  });

  register
    .save()
    // eslint-disable-next-line no-shadow
    .then((result) => {
      console.log(result);

      // eslint-disable-next-line no-use-before-define
      sendOtp(result, res);
      console.log(`${email}sdfa`);
    })
    .catch((e) => {
      console.log(e);

      res.send(e);
    });
};

const sendOtp = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailDetails = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'OTP VERIFICATION',
      html: `<p>YOUR OTP FOR REGISTERING IS <h1> ${otp} <h1> </p>`,
    };

    const SaltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, SaltRounds);
    // eslint-disable-next-line new-cap
    const newOtp = new otpModel({
      company_id: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOtp.save();
    await sendOtpMiddle.mailTransporter.sendMail(mailDetails);
    res.send({
      status: 'success',
      message: 'Verification otp email send',
      Company_id: _id,
      email,
    });
    // console.log(email);
  } catch (error) {
    res.send({
      status: 'Failed',
      message: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { id, email } = req.body;
    if (!id || !email) {
      throw new Error('Empty company details');
    } else {
      await otpModel.deleteOne({ company_id: id });
      sendOtp({ _id: id, email }, res);
    }
  } catch (error) {
    res.send({
      status: 'failed',
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { id, otp } = req.body;
    console.log(req.body);
    if (!id || !otp) {
      throw Error('Empty OTP details');
    } else {
      const otpDoc = await otpModel.find({
        company_id: id,
      });

      if (otpDoc.length <= 0) {
        throw new Error(
          "Account record  doesn't exist . Please sign up or log in"
        );
      } else {
        const { expiresAt } = otpDoc[0];
        const hashOTP = otpDoc[0].otp;

        if (expiresAt < Date.now()) {
          await otpModel.deleteOne({ company_id: id });
          throw new Error('OTP has expired. Please request again');
        } else {
          const validOTP = await bcrypt.compare(otp, hashOTP);

          // console.log(await bcrypt.compare(otp, hashOTP));
          if (!validOTP) {
            throw new Error('Invalid OTP');
          } else {
            await companyModel.Registration.updateOne(
              { _id: id },
              { verified: true }
            );
            await otpModel.deleteOne({ company_id: id });
            res.send({ success: true, message: 'User verified' });
          }
        }
      }
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const setPassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    const SaltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, SaltRounds);
    await companyModel.Registration.updateOne(
      { _id: id },
      { password: hashedPassword }
    );
    res.send({ success: true, message: 'Password updated' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getCMPId = async (req, res) => {
  try {
    const { id } = req.body;
    const doc = await companyModel.Registration.findOne({ _id: id });
    if (doc) {
      res.send({ success: true, doc, cmpid: doc.company_id });
    } else {
      res.send({ success: false, message: 'id not found' });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { cmpid, password } = req.body;
    const doc = await companyModel.Registration.findOne({
      company_id: cmpid,
    });

    if (doc) {
      const validPassword = await bcrypt.compare(password, doc.password);
      if (validPassword) {
        const reps = {
          // eslint-disable-next-line no-underscore-dangle
          id: doc._id,
          cmpid: doc.company_id,
          name: doc.comapany_name,
          accountType: 'company',
        };
        const token = jwt.sign(reps, process.env.TOKEN_SECRET_key);
        // eslint-disable-next-line no-underscore-dangle
        res.send({ success: true, message: 'user found', token, id: doc._id });
      } else {
        throw new Error('invalid company id or password');
      }
    } else {
      throw new Error('invalid company id or password');
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await companyModel.Registration.findOne({ _id: id });
    if (doc) {
      res.send({ success: true, message: 'company found', data: doc });
    } else {
      throw new Error('company not found');
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const { image } = req.files;
    const { id } = req.body;
    const fileName = Date.now();
    if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/jpg') {
      throw new Error('Please select a jpg or jpeg image');
    }
    await image.mv(`./Public/image/projects/${fileName}.jpg`);
    const data = JSON.parse(req.body.data);
    const {
      name,
      duration,
      description,
      amount,
      location,
      startDate,
      endDate,
    } = data;
    const newProject = new ProjectModel({
      company_id: id,
      project_name: name,
      duration,
      description,
      tender_amount: amount,
      location,
      start_Date: startDate,
      end_Date: endDate,
      image: fileName,
    });
    const doc = await newProject.save();
    // eslint-disable-next-line no-underscore-dangle
    res.send({ success: true, id: doc._id });
  } catch (error) {
    res.send({ success: false, message: error.message, key: 'sadf' });
  }
};

const uploadProjectImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.files;
    const fileName = id;
    await image.mv(`./Public/image/projects/${fileName}.jpg`, (err) => {
      if (!err) {
        ProjectModel.findByIdAndUpdate({ _id: id }, { image: fileName })
          .then(() => {
            res.send({ success: true });
          })
          .catch((e) => {
            console.log(e);
            res.send({ success: false, e });
          });
      } else {
        console.log(err);
        res.send({ success: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await ProjectModel.find({ company_id: id });
    if (projects.length === 0) {
      throw new Error('No projects');
    }
    res.send({ success: true, data: projects });
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

const editProject = async (req, res) => {
  try {
    console.log(req.body);
    const {
      project_name,
      duration,
      tender_amount,
      location,
      start_Date,
      end_Date,
      description,
    } = req.body.formValues;

    const { id } = req.body;

    await ProjectModel.findByIdAndUpdate(
      { _id: id },
      {
        project_name,
        duration,
        tender_amount,
        location,
        start_Date,
        end_Date,
        description,
      }
    );
    res.send({ success: true, message: 'Data edited' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const addSchedule = async (req, res) => {
  try {
    const { schedule, date, id } = req.body;
    const changeDate = new Date(date);
    const check = await ScheduleModel.find({ project_id: id });

    if (check.length <= 0) {
      const scheduleData = new ScheduleModel({
        project_id: id,
        schedules: [
          {
            date: changeDate,
            schedule,
          },
        ],
      });

      await scheduleData.save();
    } else {
      const newSchedule = {
        date: changeDate,
        schedule,
      };

      await ScheduleModel.updateOne(
        { project_id: id },
        { $push: { schedules: newSchedule } }
      );
    }
    res.send({ success: true, message: 'schedule added' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ScheduleModel.findOne({ project_id: id });
    if (data.length <= 0) {
      throw new Error('No schedules');
    }
    res.send({ success: true, docs: data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const deleteSchedules = async (req, res) => {
  try {
    const { pid, did } = req.body;
    await ScheduleModel.updateOne(
      { project_id: pid },
      { $pull: { schedules: { _id: did } } }
    );
    res.send({ success: true, message: 'deleted' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const addProjectAccesToUser = async (req, res) => {
  try {
    const { pid, uid } = req.body;
    await ProjectModel.findByIdAndUpdate(pid, {
      $push: { access: uid },
    });
    res.send({ success: true, message: 'access add to user' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const removeUserProjectAccess = async (req, res) => {
  try {
    console.log('reached');
    const { pid, uid } = req.body;
    await ProjectModel.findByIdAndUpdate(pid, {
      $pull: { access: uid },
    });
    res.send({ success: true, message: 'access removed' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const addDesignation = async (req, res) => {
  try {
    const { cid, designation, access } = req.body;
    const newDesignation = new DesignationModel({
      company_id: cid,
      designation,
      project: {
        view: access.project.view.checked,
        edit: access.project.edit.checked,
        add: access.project.add.checked,
      },
      user: {
        view: access.user.view.checked,
        edit: access.user.edit.checked,
        add: access.user.add.checked,
      },
      report: {
        view: access.report.view.checked,
      },
    });

    await newDesignation.save();
    res.send({ success: true, message: 'designation added' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getDesignation = async (req, res) => {
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

// eslint-disable-next-line no-unused-vars
const addUser = async (req, res) => {
  try {
    const { image } = req.files;
    const { id } = req.body;
    const data = JSON.parse(req.body.data);
    if (
      image.mimetype !== 'image/jpeg' &&
      image.mimetype !== 'image/jpg' &&
      image.mimetype !== 'image/webp'
    ) {
      throw new Error('Please select a jpg or jpeg image');
    }
    const { name, contact, email, password, designation } = data;
    const check = await UserModel.find({ company_id: id });
    const fileName = Date.now();
    if (check.length > 0) {
      const urdata = {
        name,
        contact,
        email,
        password,
        designation_id: designation,
        image: fileName,
      };
      await UserModel.updateOne(
        { company_id: id },
        { $push: { users: urdata } }
      );
      await image.mv(`./Public/image/user/${fileName}.jpg`);
      res.send({ success: true, message: 'user added' });
    } else {
      const newUser = new UserModel({
        company_id: id,
        users: [
          {
            name,
            contact,
            email,
            password,
            designation_id: designation,
            image: fileName,
          },
        ],
      });
      await newUser.save();
      // eslint-disable-next-line no-underscore-dangle
      await image.mv(`./Public/image/user/${fileName}.jpg`);
      res.send({ success: true, message: 'user added' });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const docs = await UserModel.findOne({ company_id: id });
    if (!docs) {
      throw new Error('No users');
    }

    res.send({ success: true, users: docs });
  } catch (error) {
    res.send({ success: true, message: error.message });
  }
};

// eslint-disable-next-line no-unused-vars
const companyEditImage = async (req, res) => {
  try {
    const { image } = req.files;
    if (!image.mimetype === 'image/jpeg' || !image.mimetype === 'image/jpg') {
      throw new Error('Invalid image');
    }
    const { id } = req.params;
    const fileName = id;
    await image.mv(`./Public/image/company/${fileName}.jpg`, (err) => {
      if (!err) {
        companyModel.Registration.findByIdAndUpdate(
          { _id: id },
          { image: fileName }
        )
          .then(() => {
            res.send({ success: true });
          })
          .catch((e) => {
            res.send({ success: false, e });
          });
      } else {
        res.send({ success: false });
      }
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = {
  Registration,
  verifyOTP,
  setPassword,
  resendOTP,
  getCMPId,
  login,
  getCompanyDetails,
  // Project
  addProject,
  uploadProjectImage,
  getProjects,
  getSingleProject,
  editProject,
  addSchedule,
  getSchedules,
  deleteSchedules,
  addProjectAccesToUser,
  removeUserProjectAccess,
  // User
  addDesignation,
  getDesignation,
  addUser,
  getUsers,
  companyEditImage,
};
