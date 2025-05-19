
const mongoose = require('mongoose');

const settingSchema = mongoose.Schema(
  {
    platformName: {
      type: String,
      default: 'HR Management System'
    },
    companyName: {
      type: String,
      default: 'Tech Solutions Inc.'
    },
    supportEmail: {
      type: String,
      default: 'support@hrsystem.com'
    },
    contactPhone: {
      type: String,
      default: ''
    },
    logoUrl: {
      type: String,
      default: ''
    },
    faviconUrl: {
      type: String,
      default: ''
    },
    // Security settings
    passwordPolicy: {
      type: String,
      enum: ['low', 'medium', 'high', 'custom'],
      default: 'medium'
    },
    minPasswordLength: {
      type: Number,
      default: 8
    },
    requireSpecialChars: {
      type: Boolean,
      default: true
    },
    requireNumbers: {
      type: Boolean,
      default: true
    },
    requireUppercase: {
      type: Boolean,
      default: true
    },
    mfaEnabled: {
      type: Boolean,
      default: false
    },
    sessionTimeout: {
      type: Number,
      default: 30 // minutes
    },
    maxLoginAttempts: {
      type: Number,
      default: 5
    },
    // Email settings
    smtpServer: {
      type: String,
      default: ''
    },
    smtpPort: {
      type: Number,
      default: 587
    },
    smtpUsername: {
      type: String,
      default: ''
    },
    smtpPassword: {
      type: String,
      default: ''
    },
    senderEmail: {
      type: String,
      default: ''
    },
    senderName: {
      type: String,
      default: ''
    },
    enableSSL: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      enum: ['general', 'security', 'email', 'database', 'billing'],
      default: 'general'
    }
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
