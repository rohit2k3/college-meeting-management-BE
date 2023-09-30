const asyncError = require("../middleware/asyncError");
const errorHandler = require('../utils/errorHandler');

const Meeting = require("../models/meetingModel");

const getSlots = asyncError(async (req, res, next) => {
  const slots = await Meeting.find();
  if (slots.length == 0) {
    return next(new errorHandler("No slots found", 403));
  }
  res.status(200).json({ status: true, slots });
});



const createSlot = asyncError(async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return next(new errorHandler("Invalid Details", 400));
  }
  const saveData = await Meeting.create({ deanEmail:req.user.email , deanName:req.user.name, day });
  res.status(201).json({ status: true, message: "Slot Created", saveData });
});


const bookSlot = asyncError(async (req, res, next) => {
  const id = req.params.id;
  const {email, name} = req.body;
  if(!email || !name){
    return (next(new errorHandler("Invalid Details" , 400)))
  }
  const data = await Meeting.findById(id);
  if(data == null){
    return next(new errorHandler("Invalid ID" , 400));
  }
  if (data.bookingStatus != "pending") {
    return next(new errorHandler("Already Booked" , 400));
  }
  const saveData = await Meeting.findByIdAndUpdate(
    id,
    { bookingStatus: "booked", studentEmail:email, studentName:name},
    {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    }
  );
  res.status(200).json({
    status: true,
    message: "Slot Booked Successfully",
    data:saveData
  });
});

module.exports = { getSlots, createSlot, bookSlot };
