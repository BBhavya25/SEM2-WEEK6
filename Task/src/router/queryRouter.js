const express = require('express');
const {
    getUsersByAge,
    getUsersByName,
    getSpecificFields,
    getSortedUsers
} = require('../controller/queryContoller');
const router = express.Router();

// Route to get users with age > 18
router.get('/usersByAge', getUsersByAge);

// Route to get users whose names start with a specific letter
router.get('/usersByName/:letter', getUsersByName);

// Route to get specific fields (username, email)
router.get('/specificFields', getSpecificFields);

// Route to get sorted users by name
router.get('/sortedUsers', getSortedUsers);

module.exports = router;
