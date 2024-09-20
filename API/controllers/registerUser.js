const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please enter all fields",
            });
        }

        const isUser = await User.findOne({ email });

        if (isUser) {
            return res.status(400).json({
                message: "User already exists",
                
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.json({
            message: "User Registered",
            data: newUser,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = registerUser;
