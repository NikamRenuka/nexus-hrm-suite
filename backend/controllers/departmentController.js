
const asyncHandler = require('express-async-handler');
const Department = require('../models/departmentModel');
const Employee = require('../models/employeeModel');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({})
    .populate('head', 'firstName lastName')
    .populate('parentDepartment', 'name');
  
  res.json(departments);
});

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Private
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id)
    .populate('head', 'firstName lastName')
    .populate('parentDepartment', 'name');

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private/HR/Admin
const createDepartment = asyncHandler(async (req, res) => {
  const { name, code, description, head, parentDepartment } = req.body;

  // Check if department name or code already exists
  const departmentExists = await Department.findOne({ 
    $or: [{ name }, { code }]
  });
  
  if (departmentExists) {
    res.status(400);
    throw new Error('Department with this name or code already exists');
  }

  // Create department
  const department = await Department.create({
    name,
    code,
    description,
    head,
    parentDepartment,
    isActive: true,
  });

  res.status(201).json(department);
});

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Private/HR/Admin
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    department.name = req.body.name || department.name;
    department.code = req.body.code || department.code;
    department.description = req.body.description || department.description;
    department.head = req.body.head || department.head;
    department.parentDepartment = req.body.parentDepartment || department.parentDepartment;
    department.isActive = req.body.isActive !== undefined ? req.body.isActive : department.isActive;

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } else {
    res.status(404);
    throw new Error('Department not found');
  }
});

// @desc    Delete a department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    res.status(404);
    throw new Error('Department not found');
  }

  // Check if any employees are assigned to this department
  const employeesInDepartment = await Employee.countDocuments({ 
    'jobDetails.department': department._id 
  });

  if (employeesInDepartment > 0) {
    res.status(400);
    throw new Error('Cannot delete department with assigned employees');
  }

  // Check if any departments have this as parent
  const childDepartments = await Department.countDocuments({ 
    parentDepartment: department._id 
  });

  if (childDepartments > 0) {
    res.status(400);
    throw new Error('Cannot delete department with child departments');
  }

  await Department.deleteOne({ _id: department._id });
  res.json({ message: 'Department removed' });
});

// @desc    Get department employees
// @route   GET /api/departments/:id/employees
// @access  Private/HR/Admin/Manager
const getDepartmentEmployees = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  
  if (!department) {
    res.status(404);
    throw new Error('Department not found');
  }

  const employees = await Employee.find({ 
    'jobDetails.department': department._id 
  })
  .populate('user', 'name email role')
  .populate('jobDetails.reportingManager', 'firstName lastName');

  res.json(employees);
});

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees
};
