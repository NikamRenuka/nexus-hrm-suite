
const asyncHandler = require('express-async-handler');
const Payroll = require('../models/payrollModel');
const Employee = require('../models/employeeModel');
const Attendance = require('../models/attendanceModel');

// @desc    Generate payroll for an employee
// @route   POST /api/payroll
// @access  Private/HR/Admin
const generatePayroll = asyncHandler(async (req, res) => {
  const { 
    employeeId, 
    month, 
    year, 
    basicSalary,
    earnings,
    deductions,
    remarks
  } = req.body;

  // Check if employee exists
  const employee = await Employee.findById(employeeId);
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Check if payroll already exists for this month/year
  const existingPayroll = await Payroll.findOne({
    employee: employeeId,
    month,
    year
  });

  if (existingPayroll) {
    res.status(400);
    throw new Error(`Payroll already exists for ${month}/${year}`);
  }

  // Calculate total earnings
  const totalEarnings = basicSalary + 
    (earnings?.hra || 0) + 
    (earnings?.conveyance || 0) + 
    (earnings?.medicalAllowance || 0) + 
    (earnings?.specialAllowance || 0) + 
    (earnings?.bonus || 0) + 
    (earnings?.otherAllowances || 0);

  // Calculate total deductions
  const totalDeductions = 
    (deductions?.providentFund || 0) + 
    (deductions?.professionalTax || 0) + 
    (deductions?.incomeTax || 0) + 
    (deductions?.healthInsurance || 0) + 
    (deductions?.otherDeductions || 0);

  // Calculate net salary
  const netSalary = totalEarnings - totalDeductions;

  // Create payroll
  const payroll = await Payroll.create({
    employee: employeeId,
    month,
    year,
    basicSalary,
    earnings: earnings || {
      hra: 0,
      conveyance: 0,
      medicalAllowance: 0,
      specialAllowance: 0,
      bonus: 0,
      otherAllowances: 0
    },
    deductions: deductions || {
      providentFund: 0,
      professionalTax: 0,
      incomeTax: 0,
      healthInsurance: 0,
      otherDeductions: 0
    },
    totalEarnings,
    totalDeductions,
    netSalary,
    remarks,
    generatedBy: req.user._id,
    status: 'draft'
  });

  res.status(201).json(payroll);
});

// @desc    Get all payrolls
// @route   GET /api/payroll
// @access  Private/HR/Admin
const getAllPayrolls = asyncHandler(async (req, res) => {
  const { 
    month, 
    year, 
    status, 
    employeeId, 
    page = 1, 
    limit = 10 
  } = req.query;
  
  let filter = {};

  if (month) {
    filter.month = parseInt(month);
  }

  if (year) {
    filter.year = parseInt(year);
  }

  if (status) {
    filter.status = status;
  }

  if (employeeId) {
    filter.employee = employeeId;
  }

  const total = await Payroll.countDocuments(filter);
  const pageCount = Math.ceil(total / limit);

  const payrolls = await Payroll.find(filter)
    .populate('employee', 'firstName lastName employeeId')
    .populate('generatedBy', 'name')
    .populate('approvedBy', 'name')
    .sort({ year: -1, month: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    payrolls,
    pagination: {
      total,
      pageCount,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

// @desc    Get payroll by ID
// @route   GET /api/payroll/:id
// @access  Private/HR/Admin
const getPayrollById = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id)
    .populate('employee', 'firstName lastName employeeId')
    .populate('generatedBy', 'name')
    .populate('approvedBy', 'name');

  if (payroll) {
    res.json(payroll);
  } else {
    res.status(404);
    throw new Error('Payroll not found');
  }
});

// @desc    Update payroll status
// @route   PUT /api/payroll/:id/status
// @access  Private/HR/Admin
const updatePayrollStatus = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  
  const payroll = await Payroll.findById(req.params.id);
  
  if (!payroll) {
    res.status(404);
    throw new Error('Payroll not found');
  }

  payroll.status = status;
  
  if (status === 'approved') {
    payroll.approvedBy = req.user._id;
  }
  
  if (remarks) {
    payroll.remarks = remarks;
  }

  const updatedPayroll = await payroll.save();
  
  res.json(updatedPayroll);
});

// @desc    Update payroll bank transfer details
// @route   PUT /api/payroll/:id/bank-transfer
// @access  Private/HR/Admin
const updateBankTransfer = asyncHandler(async (req, res) => {
  const { transactionId, transferDate, status } = req.body;
  
  const payroll = await Payroll.findById(req.params.id);
  
  if (!payroll) {
    res.status(404);
    throw new Error('Payroll not found');
  }

  payroll.bankTransferDetails = {
    transactionId,
    transferDate: transferDate || new Date(),
    status: status || 'completed'
  };
  
  if (status === 'completed') {
    payroll.status = 'paid';
  }

  const updatedPayroll = await payroll.save();
  
  res.json(updatedPayroll);
});

// @desc    Get my salary slips (for logged in employee)
// @route   GET /api/payroll/my
// @access  Private
const getMySalarySlips = asyncHandler(async (req, res) => {
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const payrolls = await Payroll.find({ 
    employee: employee._id,
    status: { $in: ['approved', 'paid'] }  // Only show approved or paid payrolls
  }).sort({ year: -1, month: -1 });
  
  res.json(payrolls);
});

module.exports = {
  generatePayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayrollStatus,
  updateBankTransfer,
  getMySalarySlips
};
