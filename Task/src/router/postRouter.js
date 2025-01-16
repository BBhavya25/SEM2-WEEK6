const express = require('express');
const {
    createPost,
    getPosts,
    getPostsByUser
} = require('../controllers/postController');
const router = express.Router();

// Route to create a new post
router.post('/createPost', createPost);

// Route to fetch all posts with user details
router.get('/posts', getPosts);

// Route to fetch posts by a specific user
router.get('/posts/:userId', getPostsByUser);

module.exports = router;
