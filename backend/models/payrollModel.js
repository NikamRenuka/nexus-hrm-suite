
const mongoose = require('mongoose');

const payrollSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    earnings: {
      hra: {
        type: Number,
        default: 0,
      },
      conveyance: {
        type: Number,
        default: 0,
      },
      medicalAllowance: {
        type: Number,
        default: 0,
      },
      specialAllowance: {
        type: Number,
        default: 0,
      },
      bonus: {
        type: Number,
        default: 0,
      },
      otherAllowances: {
        type: Number,
        default: 0,
      },
    },
    deductions: {
      providentFund: {
        type: Number,
        default: 0,
      },
      professionalTax: {
        type: Number,
        default: 0,
      },
      incomeTax: {
        type: Number,
        default: 0,
      },
      healthInsurance: {
        type: Number,
        default: 0,
      },
      otherDeductions: {
        type: Number,
        default: 0,
      },
    },
    totalEarnings: {
      type: Number,
      required: true,
    },
    totalDeductions: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    bankTransferDetails: {
      transactionId: String,
      transferDate: Date,
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    },
    remarks: String,
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'paid'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for employee, month and year to ensure unique payroll records
payrollSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
