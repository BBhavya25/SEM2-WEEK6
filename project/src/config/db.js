const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb://localhost:27017/blogApp'; // Your MongoDB URI here
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process in case of failure
    }
};

module.exports = connectDB;
