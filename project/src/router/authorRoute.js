const express = require('express');
const { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controller/authorController');
const router = express.Router();

// Route to create a new author
router.post('/create', createAuthor);

// Route to fetch all authors
router.get('/', getAllAuthors);

// Route to fetch an author by ID
router.get('/:authorId', getAuthorById);

// Route to update an author by ID
router.put('/:authorId', updateAuthor);

// Route to delete an author by ID
router.delete('/:authorId', deleteAuthor);

module.exports = router;
