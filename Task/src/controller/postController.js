const PostModel = require('../models/postSchema');
const UserModel = require('../models/userSchema');

const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create a new post
        const newPost = new PostModel({
            title,
            content,
            user: userId,
        });

        await newPost.save();
        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        console.error("Error in createPost controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user', 'username email'); // Fetch user details (username and email only)
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error in getPosts controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await PostModel.find({ user: userId }).populate('user', 'username email');
        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: "No posts found for this user" });
        }

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error in getPostsByUser controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

