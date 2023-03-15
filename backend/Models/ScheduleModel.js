/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  project_id: {
    type: String,
    required: true,
  },
  schedules: [
    {
      date: {
        type: Date,
        required: true,
      },
      schedule: {
        type: String,
        required: true,
      },
    },
  ],
});

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;
