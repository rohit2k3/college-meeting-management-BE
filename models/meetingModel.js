const mongoose = require("mongoose");
const validator = require("validator");


const meetingSchema = new mongoose.Schema({
  deanEmail: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email"],
    required:true,
  },
  deanName: {
    type: String,
  },
  studentEmail: {
    type: String,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  studentName: {
    type: String,
  },
  bookingStatus: {
    type: String,
    required:true,
    default:"pending"
  }
  ,

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
