const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],  // Username is required
        trim: true,                                // Remove any extra spaces
        unique: true                               // Ensure username is unique
    },
    email: {
        type: String,
        required: [true, 'Email is required'],     // Email is required
        unique: true,                              // Email should be unique
    },
    password: {
        type: String,
        required: [true, 'Password is required'],  // Password is required
        minlength: [6, 'Password must be at least 6 characters long']  // Password min length validation
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],      // Age is required
        min: [18, 'Age must be at least 18'],      // Minimum age of 18
        max: [100, 'Age must be below 100']        // Maximum age of 100
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { // Only hash the password if it is modified
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Post-save middleware to log a message
userSchema.post('save', function (doc) {
    console.log(`User ${doc.email} was successfully saved.`);
});

// Virtual property for the full name
userSchema.virtual('fullName').get(function () {
    return `${this.name}`;
});

// Indexing the email for better performance
userSchema.index({ email: 1 });

// Static method to find users by the first letter of their name
userSchema.statics.findByFirstLetter = async function (letter) {
    return this.find({ name: new RegExp(`^${letter}`, 'i') });
};

// Instance method to calculate account age
userSchema.methods.getAccountAge = function () {
    const now = new Date();
    const createdAt = this.createdAt || new Date();
    const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    return diffInDays; // Return the account age in days
};

// Aggregate users by age group
userSchema.statics.groupUsersByAge = async function () {
    return this.aggregate([
        { $group: { _id: "$age", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]);
};

// Calculate the average age of users
userSchema.statics.calculateAverageAge = async function () {
    return this.aggregate([
        { $group: { _id: null, averageAge: { $avg: "$age" } } }
    ]);
};

// Create and export the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
