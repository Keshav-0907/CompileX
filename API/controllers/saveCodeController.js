const Code = require("../models/codeModel");
const User = require("../models/userModel");

const saveCode = async (req, res) => {
    try {
        const { codeData, name, userID } = req.body;

        const newCode = new Code({
            name,
            codeData: {
                html: codeData.html,
                css : codeData.css,
                javascript: codeData.javascript,
            },
        });
        const savedCode = await newCode.save();
        const user = await User.findById(userID);

        user.programs.push(savedCode._id);
        const UpdatedUser = await user.save();

        return res.json({
            message: "Code Saved",
            data: savedCode,
            success: true,
            codeID: savedCode._id,
        });
    } catch (error) {
        console.error('Error saving code:', error);
        return res.status(500).json({
            message: "Error saving code",
            error: error.message,
            success: false,
        });
    }
};

module.exports = saveCode;