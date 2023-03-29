/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProgressSchema = new Schema({
  project_id: {
    type: String,
    required: true,
  },
  progresses: [
    {
      date: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      progress: {
        type: String,
        required: true,
      },
      issue: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        required: true,
      },
      labour_list: {
        type: String,
        default: null,
      },
      by: {
        type: String,
        required: true,
      },
      dateChk: {
        type: Date,
        default: Date.now,
        require: true,
      },
    },
  ],
});

const Progress = mongoose.model('progress', ProgressSchema);

module.exports = Progress;
