const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')

const userRoute = require("./routes/userRoute");
const meetingRoute = require("./routes/meetingRoute");


app.use(express.json());
app.use("/api",userRoute)
app.use("/api",meetingRoute)


app.use(errorMiddleware);
module.exports = app;