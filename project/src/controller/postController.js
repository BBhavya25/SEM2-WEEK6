const Post = require('../models/postSchema');
const Author = require('../models/authorSchema');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;

        // Check if the author exists
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        // Create and save the new post
        const newPost = new Post({
            title,
            content,
            author: authorId,
        });

        await newPost.save();
        res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all posts with author details
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email bio'); // Populate author details
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get posts by a specific author
const getPostsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;

        const posts = await Post.find({ author: authorId }).populate('author', 'name email bio');
        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found for this author' });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error('Error fetching posts by author:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { createPost, getAllPosts, getPostsByAuthor };
