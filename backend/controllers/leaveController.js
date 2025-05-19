
const asyncHandler = require('express-async-handler');
const Leave = require('../models/leaveModel');
const Employee = require('../models/employeeModel');

// @desc    Apply for leave
// @route   POST /api/leave
// @access  Private
const applyLeave = asyncHandler(async (req, res) => {
  const { leaveType, startDate, endDate, reason, attachments } = req.body;
  
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Calculate total days (excluding weekends)
  const start = new Date(startDate);
  const end = new Date(endDate);
  let totalDays = 0;
  
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    const dayOfWeek = day.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Saturday (6) and Sunday (0)
      totalDays += 1;
    }
  }

  const leave = await Leave.create({
    employee: employee._id,
    leaveType,
    startDate,
    endDate,
    totalDays,
    reason,
    attachments: attachments || [],
  });

  res.status(201).json(leave);
});

// @desc    Get my leaves (for logged in employee)
// @route   GET /api/leave/my
// @access  Private
const getMyLeaves = asyncHandler(async (req, res) => {
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const leaves = await Leave.find({ employee: employee._id })
    .sort({ createdAt: -1 });
  
  res.json(leaves);
});

// @desc    Get all leaves (for HR/Admin/Manager)
// @route   GET /api/leave
// @access  Private/HR/Admin/Manager
const getAllLeaves = asyncHandler(async (req, res) => {
  const { 
    status, 
    employeeId, 
    leaveType, 
    startDate, 
    endDate, 
    page = 1, 
    limit = 10 
  } = req.query;
  
  let filter = {};

  if (status) {
    filter.status = status;
  }

  if (employeeId) {
    filter.employee = employeeId;
  } else if (req.user.role === 'manager') {
    // If manager, only show leaves for their team members
    const managerEmployee = await Employee.findOne({ user: req.user._id });
    
    if (!managerEmployee) {
      res.status(404);
      throw new Error('Manager employee record not found');
    }

    const teamMembers = await Employee.find({
      'jobDetails.reportingManager': managerEmployee._id
    }).select('_id');
    
    const teamMemberIds = teamMembers.map(emp => emp._id);
    filter.employee = { $in: teamMemberIds };
  }

  if (leaveType) {
    filter.leaveType = leaveType;
  }

  if (startDate) {
    filter.startDate = { $gte: new Date(startDate) };
  }

  if (endDate) {
    filter.endDate = { $lte: new Date(endDate) };
  }

  const total = await Leave.countDocuments(filter);
  const pageCount = Math.ceil(total / limit);

  const leaves = await Leave.find(filter)
    .populate('employee', 'firstName lastName employeeId')
    .populate('approver', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    leaves,
    pagination: {
      total,
      pageCount,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

// @desc    Get leave by ID
// @route   GET /api/leave/:id
// @access  Private/HR/Admin/Manager or Owner
const getLeaveById = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id)
    .populate('employee', 'firstName lastName employeeId')
    .populate('approver', 'name');

  if (leave) {
    // Check if user has permission to view this leave
    const isOwner = await Employee.findOne({ 
      user: req.user._id,
      _id: leave.employee._id
    });
    
    const isManager = await Employee.findOne({ 
      user: req.user._id,
      _id: leave.employee.jobDetails?.reportingManager
    });

    if (isOwner || isManager || ['hr', 'admin', 'super_admin'].includes(req.user.role)) {
      res.json(leave);
    } else {
      res.status(403);
      throw new Error('Not authorized to view this leave');
    }
  } else {
    res.status(404);
    throw new Error('Leave not found');
  }
});

// @desc    Approve/Reject leave
// @route   PUT /api/leave/:id/status
// @access  Private/HR/Admin/Manager
const updateLeaveStatus = asyncHandler(async (req, res) => {
  const { status, comments } = req.body;
  
  const leave = await Leave.findById(req.params.id);
  
  if (!leave) {
    res.status(404);
    throw new Error('Leave not found');
  }

  // Check if user has permission to approve/reject this leave
  if (req.user.role === 'manager') {
    const employee = await Employee.findById(leave.employee);
    const managerEmployee = await Employee.findOne({ user: req.user._id });
    
    if (!employee || !managerEmployee) {
      res.status(404);
      throw new Error('Employee record not found');
    }
    
    if (!employee.jobDetails.reportingManager.equals(managerEmployee._id)) {
      res.status(403);
      throw new Error('Not authorized to update this leave');
    }
  }

  leave.status = status;
  leave.approver = req.user._id;
  leave.approvalDate = new Date();
  
  if (comments) {
    leave.approverComments = comments;
  }

  const updatedLeave = await leave.save();
  
  res.json(updatedLeave);
});

// @desc    Cancel leave
// @route   PUT /api/leave/:id/cancel
// @access  Private
const cancelLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  
  if (!leave) {
    res.status(404);
    throw new Error('Leave not found');
  }

  // Check if employee owns this leave
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee || !leave.employee.equals(employee._id)) {
    res.status(403);
    throw new Error('Not authorized to cancel this leave');
  }

  // Can only cancel pending or approved leaves
  if (!['pending', 'approved'].includes(leave.status)) {
    res.status(400);
    throw new Error(`Cannot cancel leave with status: ${leave.status}`);
  }

  // Check if leave start date is in the future
  if (new Date(leave.startDate) <= new Date()) {
    res.status(400);
    throw new Error('Cannot cancel leave that has already started or ended');
  }

  leave.status = 'cancelled';
  const updatedLeave = await leave.save();
  
  res.json(updatedLeave);
});

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  getLeaveById,
  updateLeaveStatus,
  cancelLeave
};
