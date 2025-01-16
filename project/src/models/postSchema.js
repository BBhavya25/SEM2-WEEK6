const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', // Reference to Author schema (one-to-many relationship)
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
