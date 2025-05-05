const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const authMiddleware = require('../middleware/authMiddleware');
const ContractorPersonalDetailModel = require('../models/contractorProfile'); // 
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// GET Contractor Profile
router.get('/contractorprofile', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const contractorProfile = await ContractorPersonalDetailModel.findOne({ userId });

        if (!contractorProfile) {
            return res.status(404).json({ message: 'Contractor Profile Not Found' });
        }

        res.status(200).json({ contractorProfile });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: 'Error fetching profile information' });
    }
});

// POST Contractor Personal Details
router.post('/personaldetails', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const newContractorPersonalDetail = new ContractorPersonalDetailModel({
            userId,
            ...req.body
        });

        await newContractorPersonalDetail.save();
        res.status(201).json({ message: 'Contractor Personal Details added successfully' });
    } catch (error) {
        console.error('Error Occurred While Adding the project', error);
        res.status(500).json({ message: 'Error Occurred While Adding the project', error: error.message });
    }
});

//  PATCH Update Contractor Profile
router.patch('/updatecontractorprofile', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Request received");
        const updatedData = req.body.updatedData;
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const contractor = await ContractorPersonalDetailModel.findOne({ userId });
        

        if (!contractor) {
            return res.status(404).json({ message: "Contractor not found" });
        }

        Object.assign(contractor, updatedData);
        await contractor.save();

        res.json({ message: "Profile updated successfully", contractor });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Multer storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'contractor_profiles',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0], // Removes extension
    },
});
const upload = multer({ storage: storage });

// PUT: Update contractor profile image
router.put('/update-profile/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params; // Get contractor ID
      

        // Find contractor by userId
        const contractor = await ContractorPersonalDetailModel.findOne({ userId: id });

        if (!contractor) {
            return res.status(404).json({ message: 'Contractor not found' });
        }

        // Get old profile image
        const oldprofileImage = contractor.contractorProfileImage;

        if (oldprofileImage) {
            try {
              

                // Extract public ID from Cloudinary URL
                const publicId = oldprofileImage
                    .split('/contractor_profiles/')[1] 
                    .split('.')[0]; 
                    
                const deleteResult = await cloudinary.uploader.destroy(`contractor_profiles/${publicId}`);

            } catch (deleteError) {
                console.error("Error deleting old image:", deleteError.message);
            }
        }

        // Ensure a new image is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

       

        // Update contractor's profile image
        contractor.contractorProfileImage = req.file.path;
        await contractor.save();

        res.status(201).json({ success: true, message: "Profile image updated successfully", contractor });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/projets' , authMiddleware , async(req,res)=>{
    try{
    
        const userId = req.userId; 
        const contractor = await ContractorPersonalDetailModel.findOne({userId});
        if (!contractor) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
    
        const contractorTypes=contractor.contractorSpecialization;
        
        const projects = await Project.find({ taskType: contractorTypes });
       
        res.json(projects);
    } catch(err){
        console.log("Error Often During Featching the projects " , err);
        res.status(500).json({message:"Error Often During Featching the Projects"});
    } 
});


module.exports = router;