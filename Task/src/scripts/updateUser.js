const mongoose = require('mongoose');
const UserModel = require('../models/userSchema');  // Import User model
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        const userId = '60b8e9f8b15a6d51d4028d91'; // Replace with an actual user ID

        // Update user by ID
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name: 'Jane Doe', age: 28 },  // Fields to update
            { new: true }  // Returns the updated document
        );

        console.log('Updated User:', updatedUser);

        // Close the database connection
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log('Error in database connection:', error);
    });
