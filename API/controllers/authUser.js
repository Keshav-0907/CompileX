const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authUser = async (req, res) => {
    const {token} = req.body;

    if(!token){
        return res.json({
            message: 'No token provided',
            success: false
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userId = decoded.id;

    const currUser = await User.findById(userId)

    return res.json({
        message: 'User authenticated',
        success: true,
        user: {
            name: currUser.name,
            email: currUser.email,
            id: currUser._id,
            programs: currUser.programs

        }
    })
}

module.exports = authUser;