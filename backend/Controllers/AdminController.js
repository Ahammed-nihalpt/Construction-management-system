/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-console */

const jwt = require('jsonwebtoken');
const AdminModel = require('../Models/AdminModel');
const CompanyModel = require('../Models/CompanyModel');
// const bcrypt = require('bcrypt');

const adminLogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    const found = await AdminModel.findOne({ admin_id: id, password });
    if (found) {
      const reps = {
        // eslint-disable-next-line no-underscore-dangle
        id: found._id,
        admin: found.admin_id,
        accountType: 'admin',
      };
      const token = jwt.sign(reps, process.env.TOKEN_SECRET_key);
      res.send({ success: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.Registration.find();
    res.send({ success: true, companies });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const blockUnblockCompany = async (req, res) => {
  try {
    const { id } = req.params;
    let value;
    const check = await CompanyModel.Registration.findById(id);
    if (check) {
      if (check.Status === 'Active') {
        value = 'Blocked';
      } else {
        value = 'Active';
      }
    } else {
      throw new Error('Something went wrong');
    }
    await CompanyModel.Registration.findByIdAndUpdate(id, {
      Status: value,
    });
    res.send({ success: true, message: 'company status updated' });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllCompanies,
  blockUnblockCompany,
};
