const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./src/router/postRoute');
const authorRouter = require('./src/router/authorRoute'); // Optional, if you create routes for authors

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MongoDB connection
const dbURI = 'mongodb+srv@.mongodb.net/'; // Replace with your MongoDB URI

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Error connecting to MongoDB:', err.message));

mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 45000, // Increase the timeout duration
        serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB:', err.message));
    



// Routes
app.use('/posts', postRouter); // Post-related routes
app.use('/authors', authorRouter); // Author-related routes (if needed)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
