const mongoose = require('mongoose');
const database = () => {
    mongoose.connect(process.env.DB)
        .then((res) => console.log(`mongodb connected to ${res.connection.host}`))
}

module.exports = database;