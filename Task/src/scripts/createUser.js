const mongoose = require('mongoose');
const UserModel = require('../models/userSchema');  // Import User model
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Create a new user
        const newUser = new UserModel({
            name: 'John Doe',
            email: 'johndoe@example.com',
            age: 25
        });

        // Save the user to the database
        await newUser.save();
        console.log('User Created:', newUser);

        // Close the database connection
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log('Error in database connection:', error);
    });
