const User = require('../models/userModel');
const Code = require('../models/codeModel');

const getAllProjects = async (req, res) => {
    const { userId } = req.query; // Use req.query to access query parameters
    try {
        const user = await User.findById(userId); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const programs = await Code.find({ _id: { $in: user.programs } }); 

        return res.json({
            programs: programs
        });
    } catch (error) {
        console.error("Error fetching projects:", error); // Log the error
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = getAllProjects;
