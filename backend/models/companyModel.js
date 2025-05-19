
const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    industry: {
      type: String,
      required: [true, 'Please add an industry'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    employees: {
      type: Number,
      default: 0
    },
    subscription: {
      type: String,
      enum: ['Professional', 'Business', 'Enterprise'],
      default: 'Professional'
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    joinedDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
