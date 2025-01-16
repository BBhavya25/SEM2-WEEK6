const bcrypt = require('bcrypt');
const UserModel = require('../models/userSchema');

// -------------User Signup------------- ✓
const signUpUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already taken" });
        }

        // Create a new user
        const newUser = new UserModel({ name, email, password, age });

        // Save the user (password hashing is handled by pre-save middleware)
        await newUser.save();

        console.log(`User ${email} signed up successfully.`);
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error in signUpUser controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------User Login------------- ✓
const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log the incoming request data
        console.log("Login Request Data:", { email });

        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        console.log(`User ${email} logged in successfully.`);
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            user: { name: user.name, email: user.email, age: user.age } // Exclude password
        });
    } catch (error) {
        console.error("Error in logInUser controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------User Logout------------- ✓
const logOutUser = (req, res) => {
    try {
        // Any specific logout logic (e.g., session invalidation) can be added here
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logOutUser controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------Get Users by First Letter------------- ✓
const getUsersByFirstLetter = async (req, res) => {
    try {
        const { letter } = req.params;
        const users = await UserModel.findByFirstLetter(letter);
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error in getUsersByFirstLetter controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------Group Users by Age------------- ✓
const groupUsersByAge = async (req, res) => {
    try {
        const ageGroups = await UserModel.groupUsersByAge();
        res.status(200).json({ success: true, ageGroups });
    } catch (error) {
        console.error("Error in groupUsersByAge controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------Calculate Average Age------------- ✓
const calculateAverageAge = async (req, res) => {
    try {
        const result = await UserModel.calculateAverageAge();
        const averageAge = result.length > 0 ? result[0].averageAge : null;
        res.status(200).json({ success: true, averageAge });
    } catch (error) {
        console.error("Error in calculateAverageAge controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// -------------Get Account Age for a User------------- ✓
const getAccountAge = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const accountAge = user.getAccountAge();
        res.status(200).json({ success: true, accountAge });
    } catch (error) {
        console.error("Error in getAccountAge controller:", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = {
    signUpUser,
    logInUser,
    logOutUser,
    getUsersByFirstLetter,
    groupUsersByAge,
    calculateAverageAge,
    getAccountAge,
};
