const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const asyncError = require("../middleware/asyncError");
const errorHandler = require('../utils/errorHandler');


const register = asyncError(async (req,res,next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return (new errorHandler("Please fill proper details", 403));
    }

    const userData = await User.create({
        email,
        password
    })
    const jwt = userData.generateJWT();
    res.status(201).setHeader('Authorization', `Bearer ${jwt}`).json({message:"User Register Success" , token:jwt})
})



//login
const userLogin = asyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("Please fill email and password", 400))
    }

    const loginData = await User.findOne({ email });
    const jwttoken = loginData.generateJWT();
    if (!loginData) {
        return next(new errorHandler("Invalid Details", 401))
    }

    const passCheck = await bcryptjs.compare(password, loginData.password);

    if (!passCheck) {
        return next(new errorHandler("Invalid Details", 401))
    }

    res.status(200).setHeader('Authorization', `Bearer ${jwttoken}`).json({
        status: true,
        message: "Login Success",
        access_key: jwttoken
    })
    
})


//update user role

const userUpdateRole = asyncError(async (req, res, next) => {

    const {email , role}  = req.body;
    if(!email || !role){
        return(new errorHandler("Invalid Details" , 403));
    }

    const userSave = await User.findOneAndUpdate({email}, {role}, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });
    res.status(200).json({
        status: true,
        message: "User Role updated successfully"
    });
})


module.exports = {register , userLogin ,userUpdateRole};