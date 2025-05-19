
const express = require('express');
const router = express.Router();
const {
  generatePayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayrollStatus,
  updateBankTransfer,
  getMySalarySlips
} = require('../controllers/payrollController');
const { protect, hr, admin } = require('../middleware/authMiddleware');

// Employee routes
router.route('/my')
  .get(protect, getMySalarySlips);

// HR/Admin routes
router.route('/')
  .get(protect, hr, getAllPayrolls)
  .post(protect, hr, generatePayroll);

router.route('/:id')
  .get(protect, hr, getPayrollById);

router.route('/:id/status')
  .put(protect, hr, updatePayrollStatus);

router.route('/:id/bank-transfer')
  .put(protect, hr, updateBankTransfer);

module.exports = router;
