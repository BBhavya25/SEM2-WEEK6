const express = require('express');
const { createPost, getAllPosts, getPostsByAuthor } = require('../controller/postController');
const router = express.Router();

// Route for creating a new post
router.post('/create', createPost);

// Route for fetching all posts with author details
router.get('/', getAllPosts);

// Route for fetching posts by a specific author
router.get('/author/:authorId', getPostsByAuthor);

module.exports = router;
