
const express = require('express');
const router = express.Router();
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getAttendanceById,
  overrideAttendance
} = require('../controllers/attendanceController');
const { protect, hr, admin } = require('../middleware/authMiddleware');

// Employee routes
router.route('/check-in')
  .post(protect, checkIn);

router.route('/check-out')
  .post(protect, checkOut);

router.route('/my')
  .get(protect, getMyAttendance);

// HR/Admin routes
router.route('/')
  .get(protect, hr, getAllAttendance);

router.route('/:id')
  .get(protect, hr, getAttendanceById);

router.route('/:id/override')
  .put(protect, hr, overrideAttendance);

module.exports = router;
