
const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private/Admin
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Private/Admin
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @desc    Create a company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = asyncHandler(async (req, res) => {
  const { name, industry, email, employees, subscription, status } = req.body;

  const company = await Company.create({
    name,
    industry,
    email,
    employees,
    subscription,
    status
  });

  if (company) {
    res.status(201).json(company);
  } else {
    res.status(400);
    throw new Error('Invalid company data');
  }
});

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    company.name = req.body.name || company.name;
    company.industry = req.body.industry || company.industry;
    company.email = req.body.email || company.email;
    company.employees = req.body.employees !== undefined ? req.body.employees : company.employees;
    company.subscription = req.body.subscription || company.subscription;
    company.status = req.body.status || company.status;

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    await company.deleteOne();
    res.json({ message: 'Company removed' });
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @desc    Get company statistics
// @route   GET /api/companies/stats
// @access  Private/Admin
const getCompanyStats = asyncHandler(async (req, res) => {
  // Total companies
  const totalCompanies = await Company.countDocuments();
  
  // Active companies
  const activeCompanies = await Company.countDocuments({ status: 'active' });
  
  // Companies by subscription
  const subscriptionStats = await Company.aggregate([
    {
      $group: {
        _id: '$subscription',
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Companies by industry
  const industryStats = await Company.aggregate([
    {
      $group: {
        _id: '$industry',
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Recently added companies
  const recentCompanies = await Company.find()
    .sort({ createdAt: -1 })
    .limit(5);
  
  res.json({
    totalCompanies,
    activeCompanies,
    subscriptionStats,
    industryStats,
    recentCompanies
  });
});

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyStats
};
