const express = require('express');
const router = express.Router(); // Create a new router instance
const {contractorVerification ,getAllContractors } = require('../controllers/adminController');
router.post('/contractor/verifiaction',contractorVerification);
router.get('/contractor/fetchallcontractor',getAllContractors);
module.exports=router;