
const express = require('express');
const router = express.Router();
const {
  getSettings,
  getSettingsByCategory,
  updateSettings,
  initSettings,
  testEmailConfig
} = require('../controllers/settingController');
const { protect, superAdmin } = require('../middleware/authMiddleware');

// Protected routes requiring super_admin role
router.route('/')
  .get(protect, superAdmin, getSettings);

router.route('/init')
  .post(protect, superAdmin, initSettings);

router.route('/test-email')
  .post(protect, superAdmin, testEmailConfig);

router.route('/:category')
  .get(protect, superAdmin, getSettingsByCategory)
  .put(protect, superAdmin, updateSettings);

module.exports = router;
