const express = require("express");
const registerUser = require("../controllers/registerUser");
const userRouter = express.Router();
const loginUser = require("../controllers/loginUser");
const authUser = require("../controllers/authUser");

userRouter.post('/createUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.post('/verifyToken', authUser)

module.exports = userRouter;