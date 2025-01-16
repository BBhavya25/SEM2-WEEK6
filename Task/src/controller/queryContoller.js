const UserModel = require('../models/userSchema');

const getUsersByAge = async (req, res) => {
    try {
        const users = await UserModel.find({ age: { $gt: 18 } });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error in getUsersByAge controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getUsersByName = async (req, res) => {
    try {
        const { letter } = req.params; // Get the starting letter from the route parameter
        const users = await UserModel.find({ username: { $regex: `^${letter}`, $options: 'i' } }); // Case-insensitive search
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error in getUsersByName controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getSpecificFields = async (req, res) => {
    try {
        const users = await UserModel.find().select('username email'); // Only retrieve username and email
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error in getSpecificFields controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getSortedUsers = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ username: 1 }); // 1 for ascending, -1 for descending
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error in getSortedUsers controller:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
