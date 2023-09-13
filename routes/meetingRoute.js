const express = require('express');

const Route = express.Router();
const {getSlots , createSlot , bookSlot } = require("../controller/meetingController");
const { checkLogin, roleCheck } = require('../middleware/auth');

Route.route("/slots").get(checkLogin ,getSlots).post(checkLogin , roleCheck, createSlot);
Route.route("/bookSlot/:id").put(checkLogin , bookSlot);

module.exports = Route;