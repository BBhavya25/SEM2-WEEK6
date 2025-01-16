const mongoose = require('mongoose');
const UserModel = require('../models/userSchema');  // Import User model
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Fetch all users
        const users = await UserModel.find();
        console.log('All Users:', users);

        // Close the database connection
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log('Error in database connection:', error);
    });
