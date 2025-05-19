
const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      time: Date,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      address: String,
      ipAddress: String,
    },
    checkOut: {
      time: Date,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      address: String,
      ipAddress: String,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day', 'on-leave', 'holiday', 'weekend'],
      required: true,
    },
    workHours: {
      type: Number,
      default: 0,
    },
    remarks: String,
    overrideBy: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reason: String,
      timestamp: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for employee and date to ensure unique records
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
