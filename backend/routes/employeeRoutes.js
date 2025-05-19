
const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
  uploadDocument
} = require('../controllers/employeeController');
const { protect, hr, admin } = require('../middleware/authMiddleware');

// Protected routes
router.route('/profile')
  .get(protect, getMyProfile);

// HR/Admin routes
router.route('/')
  .get(protect, hr, getEmployees)
  .post(protect, hr, createEmployee);

router.route('/:id')
  .get(protect, hr, getEmployeeById)
  .put(protect, hr, updateEmployee)
  .delete(protect, admin, deleteEmployee);

router.route('/:id/documents')
  .post(protect, hr, uploadDocument);

module.exports = router;
