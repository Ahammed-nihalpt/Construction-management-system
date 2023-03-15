/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const LabourListProgress = new Schema({
  project_id: {
    type: String,
    required: true,
  },
  list: [
    {
      progress_date: {
        type: String,
        required: true,
      },
      labour_list: [
        {
          image: {
            type: String,
            default: null,
          },
          name: {
            type: String,
            default: null,
          },
          contact: {
            type: String,
            default: null,
          },
        },
      ],
    },
  ],
});

const Labour = mongoose.model('labour list', LabourListProgress);

module.exports = Labour;
