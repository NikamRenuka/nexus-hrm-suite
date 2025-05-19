
const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  getLeaveById,
  updateLeaveStatus,
  cancelLeave
} = require('../controllers/leaveController');
const { protect, hr, manager } = require('../middleware/authMiddleware');

// Employee routes
router.route('/')
  .post(protect, applyLeave);

router.route('/my')
  .get(protect, getMyLeaves);

router.route('/:id/cancel')
  .put(protect, cancelLeave);

// HR/Manager routes
router.route('/')
  .get(protect, manager, getAllLeaves);

router.route('/:id')
  .get(protect, getLeaveById);

router.route('/:id/status')
  .put(protect, manager, updateLeaveStatus);

module.exports = router;
