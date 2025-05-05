const mongoose = require("mongoose");
const Project = require('../models/project');
const User = require('../models/user');

const bidSchema = new mongoose.Schema({
  squareFeet: { type: Number, required: true },
  taskType: { type: String, required: true },
  location: { type: String, required: true },
  materialQuality: { type: String, required: true },
  urgency: { type: Number, required: true },
  complexity: { type: Number, default: 1 }, // optional default
  expectedAmount: { type: Number, required: true, min: 0 },

  contractor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },

  bidOfferByContractor: Number,
  bidOfferByUser: Number,
  finalBid: Number,

  acceptByContractor: { type: Boolean, default: false },
  acceptByUser: { type: Boolean, default: false },
  finalAccept: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
