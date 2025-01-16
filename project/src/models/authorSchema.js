const mongoose = require('mongoose');

// Define the Author schema
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        required: false,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Author model
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
