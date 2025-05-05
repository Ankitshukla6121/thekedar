const mongoose = require('mongoose');
const User = require('../models/user');
// Enum values
const taskTypes = [
  'Painting', 'Flooring', 'Plumbing', 'Electrical', 'Roofing', 
  'Carpentry', 'Demolition', 'Tiling', 'Masonry', 'Landscaping', 
  'HVAC', 'Renovation', 'Construction'
];

const locations = [
  'Urban', 'Suburban', 'Rural', 'Coastal', 'Mountainous', 
  'Industrial Area', 'Historical Area'
];

const materialQualities = [
  'Standard', 'Premium', 'Luxury', 'Economy', 'Eco-Friendly', 'Industrial'
];

const urgencies = [1.0, 1.5, 2.0, 3.0];
const complexities = [1.0, 1.2, 1.5, 2.0, 2.5];

const projectSchema = new mongoose.Schema({
  squareFeet: { 
    type: Number, 
    required: true, 
    min: 1, 
  },
  taskType: { 
    type: String, 
    required: true, 
    enum: taskTypes, 
  },
  location: { 
    type: String, 
    required: true, 
    enum: locations, 
  },
  materialQuality: { 
    type: String, 
    required: true, 
    enum: materialQualities, 
  },
  urgency: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => urgencies.includes(value),
      message: (props) => `${props.value} is not a valid urgency level`
    }
  },
  complexity: { 
    type: Number, 
    required: true, 
    validate: {
      validator: (value) => complexities.includes(value),
      message: (props) => `${props.value} is not a valid complexity level`
    }
  },
  expectedAmount: { 
    type: Number, 
    required: true, 
    min: 0, 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'In Progress', 'Completed', 'Rejected'], 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

projectSchema.index({ createdBy: 1 });
projectSchema.index({ taskType: 1 });

module.exports = mongoose.model('Project', projectSchema);
