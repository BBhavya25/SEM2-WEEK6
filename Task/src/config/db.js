const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error is connecting DB", error.message);
    }
};

module.exports = connectToMongodb;
