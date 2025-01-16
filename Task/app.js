const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./src/models/userSchema'); // Import User Schema
const userRouter = require('./src/router/userRoute'); // User Routes
const postRouter = require('./src/router/postRouter'); // Post Routes

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB Connection
const dbURI = 'mongodb+srvmongodb.net/'; // Replace with your MongoDB URI
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// --- Query and Filter Functionalities ---

// 1. Query Users with Age Greater Than 18
app.get('/users/age', async (req, res) => {
    try {
        const users = await UserModel.find({ age: { $gt: 18 } }).exec();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getUsersByAge controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 2. Query Users by Name Start with a Specific Letter (e.g., "J")
app.get('/users/name/start/:letter', async (req, res) => {
    const { letter } = req.params;
    try {
        const users = await UserModel.find({
            name: { $regex: `^${letter}`, $options: 'i' } // Case-insensitive search
        });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getUsersByNameStart controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 3. Query Users and Only Select Specific Fields (name, email)
app.get('/users/details', async (req, res) => {
    try {
        const users = await UserModel.find().select('name email'); // Select specific fields
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getUserDetails controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 4. Query Users Sorted by Name (Ascending)
app.get('/users/sorted', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ name: 1 }); // Sort by name in ascending order
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getUsersSortedByName controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// --- Route Integrations ---
app.use('/users', userRouter); // User-related routes
app.use('/posts', postRouter); // Post-related routes

// Start the Server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
