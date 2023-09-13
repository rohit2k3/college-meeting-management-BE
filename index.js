const app = require("./app");


//config
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});

//database
const db = require('./config/db.js');
db();
//server
const port = process.env.PORT;
const server =  app.listen(port, ()=> console.log(`listening on port number ${port}`));

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error was ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})