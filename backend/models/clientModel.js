
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    joinedDate: {
      type: Date,
      default: Date.now
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
