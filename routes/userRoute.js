const express = require('express');

const Route = express.Router();
const {register, userLogin, userUpdateRole} = require("../controller/userController");
const { roleCheck, checkLogin } = require('../middleware/auth');

Route.route("/register").post(register);
Route.route("/login").post(userLogin);
Route.route('/updateRole').put(checkLogin ,roleCheck, userUpdateRole);

module.exports = Route;