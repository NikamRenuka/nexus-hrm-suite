
const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyStats
} = require('../controllers/companyController');
const { protect, admin, superAdmin } = require('../middleware/authMiddleware');

// Protected routes requiring admin or super_admin role
router.route('/')
  .get(protect, admin, getCompanies)
  .post(protect, admin, createCompany);

router.route('/stats')
  .get(protect, admin, getCompanyStats);

router.route('/:id')
  .get(protect, admin, getCompanyById)
  .put(protect, admin, updateCompany)
  .delete(protect, superAdmin, deleteCompany);

module.exports = router;
