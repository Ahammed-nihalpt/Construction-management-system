/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const designationSchema = new Schema({
  company_id: String,
  designation: {
    type: String,
    require: true,
  },

  project: {
    view: {
      type: Boolean,
    },
    edit: {
      type: Boolean,
    },
    add: {
      type: Boolean,
    },
  },

  user: {
    view: {
      type: Boolean,
    },
    edit: {
      type: Boolean,
    },
    add: {
      type: Boolean,
    },
  },
  report: {
    view: {
      type: Boolean,
    },
  },
});

const Designation = mongoose.model('designation', designationSchema);

module.exports = Designation;
