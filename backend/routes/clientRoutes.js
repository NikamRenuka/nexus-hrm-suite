
const express = require('express');
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsByCompany
} = require('../controllers/clientController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protected routes requiring admin role
router.route('/')
  .get(protect, admin, getClients)
  .post(protect, admin, createClient);

router.route('/company/:companyId')
  .get(protect, admin, getClientsByCompany);

router.route('/:id')
  .get(protect, admin, getClientById)
  .put(protect, admin, updateClient)
  .delete(protect, admin, deleteClient);

module.exports = router;
