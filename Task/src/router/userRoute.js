const express = require('express');
const { 
    signUpUser, 
    logInUser, 
    logOutUser 
} = require('../controller/userController'); // Ensure correct file path to the controller

const router = express.Router();

// Route to handle user signup
router.post('/signupUser', signUpUser);

// Route to handle user login
router.post('/loginUser', logInUser);

// Route to handle user logout
router.post('/logoutUser', logOutUser);

module.exports = router;
