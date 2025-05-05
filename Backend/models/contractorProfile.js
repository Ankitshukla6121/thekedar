const mongoose = require("mongoose");

const contractorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
  contractorName: { type: String, required: true }, // Business or Personal Name
  contractorEmail: { type: String, required: true }, // Same as User Email
  contractorPhone: { type: String, required: true }, // Contact Number
  contractorPincode:{type:Number, required : true},
  contractorAddress: { type: String, required: true }, // Office/Home Address
  contractorExperience: { type: Number, required: true }, // Years of Experience
  contractorSpecialization: [{ type: String }], // Specialization (e.g., Plumbing, Electrical, etc.)
  contractorProfileImage: { type: String }, // Cloudinary URL for Profile Image
  contractorLicenseNumber: { type: String, required: true }, // License Number for Verification
  contractorDocuments: [{ type: String }], // Cloudinary URLs for Documents (License, ID, etc.)
  rating: { type: Number, default: 0 }, // Contractor's Average Rating
  completedProjects: { type: Number, default: 0 }, // Count of Completed Projects
  availabilityStatus: { type: String, enum: ["available", "busy" , "unavailable"], default: "available" }, // Online Status
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("constructorPersonalDetailModel", contractorProfileSchema);
