const mongoose = require("mongoose");
const validator = require("validator");


const meetingSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  bookingStatus: {
    type: String,
    required:true,
    default:"pending"
  }
  ,
  name: {
    type: String,
  },
  duration:{
    type:String,
    required:true,
    default:"One Hour"
  },
  day:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true,
    default:"10 AM"
  }
});

module.exports = mongoose.model("Meeting", meetingSchema);
