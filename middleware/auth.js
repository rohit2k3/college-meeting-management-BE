const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("./asyncError");


exports.checkLogin = asyncError(async (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return next(new ErrorHandler("You are not authorised to access this resource", 401))
    }
    const token = tokenHeader.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await userModel.findById(decodedData.id);
    next()
})


exports.roleCheck = asyncError(async (req, res, next) => {
    const role = req.user.role;
    console.log(`role ${role}`);
    if (role != "admin") {
        return next(new ErrorHandler("You are not authorised to access this resource", 401))
    }
    next();
})