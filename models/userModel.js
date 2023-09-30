const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter E-mail"],
        validate: [validator.isEmail, "Please enter valid email"]
    },
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "Password should greater than 8 characters"]
    },
    role: {
        type: String,
        default: "user"
    },
})

//password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10)
})

// jwt auth
userSchema.methods.generateJWT =  function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("User", userSchema);