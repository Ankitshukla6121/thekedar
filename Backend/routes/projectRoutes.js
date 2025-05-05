// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const authMiddleware = require('../middleware/authMiddleware');


// Add new project
router.post('/projects/add', authMiddleware,async (req, res) => {
    try {
      // Destructure the request body
      const createdBy = req.userId;
      const { squareFeet, taskType, location, materialQuality, urgency, complexity } = req.body;
  
    
      if (!squareFeet || !taskType || !location || !materialQuality || !urgency || !complexity) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Calculate the expected price based on the received values
      const expectedAmount = calculateExpectedAmount({
        squareFeet,
        taskType,
        location,
        materialQuality,
        urgency,
        complexity
      });
  
      // Create a new project instance with the provided data
      const newProject = new Project({
        squareFeet,
        taskType,
        location,
        materialQuality,
        urgency,
        complexity,
        expectedAmount,
        createdBy
      });
  
      // Save the project to the database
      await newProject.save();
  
      // Send success response with the added project
      res.status(201).json({
        message: 'Project added successfully',
        project: newProject,
      });
    } catch (error) {
      // Send error response if something goes wrong
      console.error('Error adding project:', error);
      res.status(500).json({
        message: 'Error adding project',
        error: error.message,
      });
    }
  });
  
  // Function to calculate the expected price based on project details
  function calculateExpectedAmount({ squareFeet, taskType, location, materialQuality, urgency, complexity }) {
    let price = squareFeet * 10;  // Base price per square foot
  
    // Adjust price based on task type
    switch (taskType) {
      case 'Renovation':
        price += 5000;
        break;
      case 'Construction':
        price += 10000;
        break;
      case 'Electrical':
        price += 3000;
        break;
      case 'Plumbing':
        price += 2000;
        break;
      case 'Painting':
        price += 1500;
        break;
      case 'Flooring':
        price += 2000;
        break;
      case 'Roofing':
        price += 2500;
        break;
      case 'Carpentry':
        price += 1200;
        break;
      case 'Tiling':
        price += 1800;
        break;
      case 'Masonry':
        price += 3000;
        break;
      case 'Landscaping':
        price += 2200;
        break;
      case 'HVAC':
        price += 4000;
        break;
      default:
        price += 1000;
    }
  
    // Material quality impact
    switch (materialQuality) {
      case 'Premium':
        price *= 1.5; // 50% more for premium materials
        break;
      case 'Luxury':
        price *= 2;  // Double the cost for luxury materials
        break;
      case 'Economy':
        price *= 0.8; // Discount for economy materials
        break;
      case 'Eco-Friendly':
        price *= 1.1; // Slight increase for eco-friendly materials
        break;
      case 'Industrial':
        price *= 1.3; // Increase for industrial materials
        break;
      default:
        price *= 1; // No change for standard
    }
  
    // Location impact (example for cost increases in coastal or mountainous areas)
    switch (location) {
      case 'Coastal':
        price *= 1.2;  // 20% increase for coastal area projects
        break;
      case 'Mountainous':
        price *= 1.3;  // 30% increase for mountainous area projects
        break;
      case 'Urban':
        price *= 1.1; // 10% increase for urban areas
        break;
      case 'Rural':
        price *= 0.9; // 10% discount for rural areas
        break;
      case 'Suburban':
        price *= 1.05; // 5% increase for suburban areas
        break;
      case 'Industrial Area':
        price *= 1.15; // 15% increase for industrial areas
        break;
      case 'Historical Area':
        price *= 1.25; // 25% increase for historical areas due to preservation
        break;
      default:
        price *= 1; // No change for standard locations
    }
  
    // Urgency factor (Multiplier based on urgency level)
    price *= urgency; // urgency factor (1.0, 1.5, 2.0, 3.0)
  
    // Complexity factor (Multiplier based on complexity)
    price *= complexity; // complexity factor (1.0, 1.2, 1.5, 2.0, etc.)
  
    return price;
  }
  router.get('/get/projects', authMiddleware ,async (req, res) => {
    try {
        // Get the user id from the middleware (assumed to be set as req.userId)
        const userId = req.userId;
        
        // Use the userId to query projects where the 'createdBy' field matches this id
        const projects = await Project.find({ createdBy: userId });
        res.status(200).json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});



// Export the router
module.exports = router;
