const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Post model
const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
