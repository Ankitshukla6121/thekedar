const User = require('../models/user');
const { sendVerificationEmail } = require('../models/contractorEmail'); // Assuming the email service is in a file called emailService.js
exports.contractorVerification = async (req, res) => {
    const { email, isVerified } = req.body;

    // Validate input
    if (!email || typeof isVerified === 'undefined') {
        return res.status(400).json({ message: 'Email and isVerified are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update verification status
        user.isVerified = isVerified;
        await user.save();
        if (user.isVerified) {
            sendVerificationEmail(user.email , user.name);
          }
        res.status(200).json({ message: 'User verification status updated.' });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while updating the user.', error: err.message });
    }
};

exports.getAllContractors = async (req, res) => {
    try {
        // Find all users with role "contractor"
        const contractors = await User.find({ role: 'contractor' });

        if (contractors.length === 0) {
            return res.status(404).json({ message: 'No contractors found.' });
        }

        res.status(200).json({ message: 'Contractors fetched successfully.', contractors });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while fetching contractors.', error: err.message });
    }
};

