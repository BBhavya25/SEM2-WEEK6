const mongoose = require('mongoose');
const UserModel = require('../models/userSchema');  // Import User model
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        const userId = '60b8e9f8b15a6d51d4028d91'; // Replace with an actual user ID

        // Delete user by ID
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (deletedUser) {
            console.log('Deleted User:', deletedUser);
        } else {
            console.log('User not found');
        }

        // Close the database connection
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log('Error in database connection:', error);
    });
