
const express = require('express');
const router = express.Router();
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees
} = require('../controllers/departmentController');
const { protect, hr, admin } = require('../middleware/authMiddleware');

// Get all departments - any authenticated user
router.route('/')
  .get(protect, getDepartments);

// HR/Admin routes
router.route('/')
  .post(protect, hr, createDepartment);

router.route('/:id')
  .get(protect, getDepartmentById)
  .put(protect, hr, updateDepartment)
  .delete(protect, admin, deleteDepartment);

router.route('/:id/employees')
  .get(protect, hr, getDepartmentEmployees);

module.exports = router;
