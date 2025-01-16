const express = require('express');
const app = express();
const router = require('./src/router/userRoute');  // Import user routes
const connectToMongoDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());  // Middleware to parse JSON requests

app.use('/', router);  // Use the user routes

// Start the server and connect to MongoDB
app.listen(8080, () => {
    connectToMongoDB();
    console.log("Server is running on port 8080...");
});
