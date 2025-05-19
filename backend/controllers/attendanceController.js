
const asyncHandler = require('express-async-handler');
const Attendance = require('../models/attendanceModel');
const Employee = require('../models/employeeModel');

// @desc    Mark attendance (check-in)
// @route   POST /api/attendance/check-in
// @access  Private
const checkIn = asyncHandler(async (req, res) => {
  const { coordinates, address, ipAddress } = req.body;
  
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Check if already checked in today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let attendance = await Attendance.findOne({
    employee: employee._id,
    date: today
  });

  if (attendance && attendance.checkIn.time) {
    res.status(400);
    throw new Error('Already checked in today');
  }

  const now = new Date();

  if (!attendance) {
    // Create new attendance record
    attendance = new Attendance({
      employee: employee._id,
      date: today,
      checkIn: {
        time: now,
        coordinates,
        address,
        ipAddress,
      },
      status: 'present',
    });
  } else {
    // Update existing record
    attendance.checkIn = {
      time: now,
      coordinates,
      address,
      ipAddress,
    };
    attendance.status = 'present';
  }

  await attendance.save();

  res.status(201).json(attendance);
});

// @desc    Mark attendance (check-out)
// @route   POST /api/attendance/check-out
// @access  Private
const checkOut = asyncHandler(async (req, res) => {
  const { coordinates, address, ipAddress } = req.body;
  
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Check if checked in today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const attendance = await Attendance.findOne({
    employee: employee._id,
    date: today
  });

  if (!attendance || !attendance.checkIn.time) {
    res.status(400);
    throw new Error('Need to check in first');
  }

  if (attendance.checkOut.time) {
    res.status(400);
    throw new Error('Already checked out today');
  }

  const now = new Date();

  // Calculate work hours
  const checkInTime = new Date(attendance.checkIn.time);
  const workHours = (now - checkInTime) / (1000 * 60 * 60);

  // Update attendance record
  attendance.checkOut = {
    time: now,
    coordinates,
    address,
    ipAddress,
  };
  attendance.workHours = parseFloat(workHours.toFixed(2));

  await attendance.save();

  res.json(attendance);
});

// @desc    Get my attendance (for logged in employee)
// @route   GET /api/attendance/my
// @access  Private
const getMyAttendance = asyncHandler(async (req, res) => {
  // Find employee by user ID
  const employee = await Employee.findOne({ user: req.user._id });
  
  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  // Get query parameters for filtering
  const { startDate, endDate } = req.query;
  let filter = { employee: employee._id };

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  } else if (startDate) {
    filter.date = { $gte: new Date(startDate) };
  } else if (endDate) {
    filter.date = { $lte: new Date(endDate) };
  }

  const attendance = await Attendance.find(filter).sort({ date: -1 });
  
  res.json(attendance);
});

// @desc    Get all attendance records (for HR/Admin)
// @route   GET /api/attendance
// @access  Private/HR/Admin
const getAllAttendance = asyncHandler(async (req, res) => {
  // Get query parameters for filtering
  const { 
    startDate, 
    endDate, 
    employeeId, 
    status, 
    departmentId, 
    page = 1, 
    limit = 10 
  } = req.query;

  let filter = {};

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  } else if (startDate) {
    filter.date = { $gte: new Date(startDate) };
  } else if (endDate) {
    filter.date = { $lte: new Date(endDate) };
  }

  if (status) {
    filter.status = status;
  }

  if (employeeId) {
    filter.employee = employeeId;
  }

  // If department filter is applied, first get all employees in that department
  if (departmentId) {
    const employeesInDepartment = await Employee.find({
      'jobDetails.department': departmentId
    }).select('_id');
    
    const employeeIds = employeesInDepartment.map(emp => emp._id);
    filter.employee = { $in: employeeIds };
  }

  const total = await Attendance.countDocuments(filter);
  const pageCount = Math.ceil(total / limit);

  const attendance = await Attendance.find(filter)
    .populate('employee', 'firstName lastName employeeId')
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    attendance,
    pagination: {
      total,
      pageCount,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

// @desc    Get attendance by ID
// @route   GET /api/attendance/:id
// @access  Private/HR/Admin
const getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id)
    .populate('employee', 'firstName lastName employeeId')
    .populate('overrideBy.user', 'name role');

  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error('Attendance record not found');
  }
});

// @desc    Override attendance (for HR/Admin)
// @route   PUT /api/attendance/:id/override
// @access  Private/HR/Admin
const overrideAttendance = asyncHandler(async (req, res) => {
  const { 
    checkIn, 
    checkOut, 
    status, 
    workHours, 
    remarks 
  } = req.body;

  const attendance = await Attendance.findById(req.params.id);

  if (!attendance) {
    res.status(404);
    throw new Error('Attendance record not found');
  }

  // Update attendance record
  if (checkIn) attendance.checkIn = { ...attendance.checkIn, time: new Date(checkIn) };
  if (checkOut) attendance.checkOut = { ...attendance.checkOut, time: new Date(checkOut) };
  if (status) attendance.status = status;
  if (workHours !== undefined) attendance.workHours = workHours;
  if (remarks) attendance.remarks = remarks;

  // Add override information
  attendance.overrideBy = {
    user: req.user._id,
    reason: req.body.overrideReason,
    timestamp: new Date()
  };

  const updatedAttendance = await attendance.save();
  
  res.json(updatedAttendance);
});

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getAttendanceById,
  overrideAttendance
};
