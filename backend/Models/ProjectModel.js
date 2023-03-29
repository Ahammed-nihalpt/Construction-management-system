/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  company_id: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  tender_amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  start_Date: {
    type: String,
    required: true,
  },
  end_Date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: null,
  },
  status: {
    type: String,
    default: 'On going',
    required: true,
  },
  access: [{ type: String, default: null }],
});

const Project = mongoose.model('project', projectSchema);
module.exports = Project;
