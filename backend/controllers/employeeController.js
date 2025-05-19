
const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const User = require('../models/userModel');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/HR/Admin
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({})
    .populate('user', 'name email role')
    .populate('jobDetails.department', 'name')
    .populate('jobDetails.reportingManager', 'firstName lastName');
  
  res.json(employees);
});

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private/HR/Admin
const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)
    .populate('user', 'name email role')
    .populate('jobDetails.department', 'name')
    .populate('jobDetails.reportingManager', 'firstName lastName');

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/HR/Admin
const createEmployee = asyncHandler(async (req, res) => {
  const {
    userId,
    employeeId,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    contactDetails,
    jobDetails,
    bankDetails,
  } = req.body;

  // Check if employee ID already exists
  const employeeExists = await Employee.findOne({ employeeId });
  if (employeeExists) {
    res.status(400);
    throw new Error('Employee ID already exists');
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Create employee
  const employee = await Employee.create({
    user: userId,
    employeeId,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    contactDetails,
    jobDetails,
    bankDetails,
    status: 'active',
  });

  if (employee) {
    res.status(201).json(employee);
  } else {
    res.status(400);
    throw new Error('Invalid employee data');
  }
});

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private/HR/Admin
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    employee.firstName = req.body.firstName || employee.firstName;
    employee.lastName = req.body.lastName || employee.lastName;
    employee.dateOfBirth = req.body.dateOfBirth || employee.dateOfBirth;
    employee.gender = req.body.gender || employee.gender;
    
    // Update address if provided
    if (req.body.address) {
      employee.address = {
        ...employee.address,
        ...req.body.address,
      };
    }

    // Update contact details if provided
    if (req.body.contactDetails) {
      employee.contactDetails = {
        ...employee.contactDetails,
        ...req.body.contactDetails,
      };
    }

    // Update job details if provided
    if (req.body.jobDetails) {
      employee.jobDetails = {
        ...employee.jobDetails,
        ...req.body.jobDetails,
      };
    }

    // Update bank details if provided
    if (req.body.bankDetails) {
      employee.bankDetails = {
        ...employee.bankDetails,
        ...req.body.bankDetails,
      };
    }

    // Update status if provided
    if (req.body.status) {
      employee.status = req.body.status;
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    await Employee.deleteOne({ _id: employee._id });
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

// @desc    Get employee profile for logged in user
// @route   GET /api/employees/profile
// @access  Private
const getMyProfile = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ user: req.user._id })
    .populate('user', 'name email role')
    .populate('jobDetails.department', 'name')
    .populate('jobDetails.reportingManager', 'firstName lastName');

  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error('Employee profile not found');
  }
});

// @desc    Upload employee document
// @route   POST /api/employees/:id/documents
// @access  Private/HR/Admin
const uploadDocument = asyncHandler(async (req, res) => {
  const { name, fileUrl } = req.body;
  
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  const newDocument = {
    name,
    fileUrl,
    uploadDate: new Date(),
    verified: false,
  };

  employee.documents.push(newDocument);
  await employee.save();

  res.status(201).json(employee.documents);
});

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
  uploadDocument,
};
