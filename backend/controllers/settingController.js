
const asyncHandler = require('express-async-handler');
const Setting = require('../models/settingModel');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Private/SuperAdmin
const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find({});
  
  // Group settings by category
  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = {};
    }
    
    // Remove MongoDB specific fields
    const cleanSetting = setting.toObject();
    delete cleanSetting._id;
    delete cleanSetting.__v;
    delete cleanSetting.createdAt;
    delete cleanSetting.updatedAt;
    delete cleanSetting.category;
    
    acc[setting.category] = { ...acc[setting.category], ...cleanSetting };
    return acc;
  }, {});
  
  res.json(groupedSettings);
});

// @desc    Get settings by category
// @route   GET /api/settings/:category
// @access  Private/SuperAdmin
const getSettingsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const categorySettings = await Setting.findOne({ category });
  
  if (categorySettings) {
    res.json(categorySettings);
  } else {
    res.status(404);
    throw new Error(`Settings for category '${category}' not found`);
  }
});

// @desc    Update settings
// @route   PUT /api/settings/:category
// @access  Private/SuperAdmin
const updateSettings = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  let settings = await Setting.findOne({ category });
  
  if (settings) {
    // Update all fields that are in the request body
    Object.keys(req.body).forEach(key => {
      if (key in settings) {
        settings[key] = req.body[key];
      }
    });
    
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } else {
    // Create settings if they don't exist
    const newSettings = new Setting({
      category,
      ...req.body
    });
    
    const createdSettings = await newSettings.save();
    res.status(201).json(createdSettings);
  }
});

// @desc    Initialize default settings
// @route   POST /api/settings/init
// @access  Private/SuperAdmin
const initSettings = asyncHandler(async (req, res) => {
  // Check if settings already exist
  const existingSettings = await Setting.countDocuments();
  
  if (existingSettings > 0) {
    res.status(400);
    throw new Error('Settings have already been initialized');
  }
  
  // Create default settings for each category
  const generalSettings = new Setting({
    category: 'general',
    platformName: 'HR Management System',
    companyName: 'Tech Solutions Inc.',
    supportEmail: 'support@hrsystem.com',
    contactPhone: '+1 (555) 123-4567'
  });
  
  const securitySettings = new Setting({
    category: 'security',
    passwordPolicy: 'medium',
    minPasswordLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    mfaEnabled: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5
  });
  
  const emailSettings = new Setting({
    category: 'email',
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'notifications@example.com',
    senderEmail: 'notifications@example.com',
    senderName: 'HR System Notifications',
    enableSSL: true
  });
  
  // Save all settings
  await Promise.all([
    generalSettings.save(),
    securitySettings.save(),
    emailSettings.save()
  ]);
  
  res.status(201).json({ message: 'Default settings initialized successfully' });
});

// @desc    Test email configuration
// @route   POST /api/settings/test-email
// @access  Private/SuperAdmin
const testEmailConfig = asyncHandler(async (req, res) => {
  const { recipientEmail } = req.body;
  
  if (!recipientEmail) {
    res.status(400);
    throw new Error('Recipient email is required');
  }
  
  const emailSettings = await Setting.findOne({ category: 'email' });
  
  if (!emailSettings || !emailSettings.smtpServer) {
    res.status(400);
    throw new Error('Email settings are not configured');
  }
  
  // In a real implementation, this would send a test email
  // using the configured SMTP settings
  
  // Simulating email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  res.json({ message: `Test email sent to ${recipientEmail}` });
});

module.exports = {
  getSettings,
  getSettingsByCategory,
  updateSettings,
  initSettings,
  testEmailConfig
};
