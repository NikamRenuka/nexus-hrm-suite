
const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    contactDetails: {
      personalEmail: String,
      phoneNumber: String,
      emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String,
      },
    },
    jobDetails: {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
      },
      designation: String,
      joiningDate: Date,
      employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'intern'],
        default: 'full-time',
      },
      reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    },
    bankDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      panNumber: String,
    },
    documents: [
      {
        name: String,
        fileUrl: String,
        uploadDate: Date,
        verified: Boolean,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'on-leave', 'terminated', 'resigned'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
