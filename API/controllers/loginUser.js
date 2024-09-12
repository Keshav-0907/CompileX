const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    const {email, password}  = req.body;

    const isUser = await User.findOne({email})

    if(!isUser){
        return res.json({
            message: 'User not found',
            success: false
        })
    }

    const isPassword = await bcrypt.compare(password, isUser.password)

    if(!isPassword){
        return res.json({
            message: 'Invalid password',
            success: false
        })
    }

    const token = jwt.sign({id: isUser._id, name: isUser.name, email: isUser.email, programs: isUser.programs}, process.env.JWT_SECRET)

    return res.json({
        message: 'Login successful',
        token: token,
        success: true,
    })
};

module.exports = loginUser;