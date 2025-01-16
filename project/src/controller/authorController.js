const Author = require('../models/authorSchema');

// ------------- Create Author -------------
const createAuthor = async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        // Check if the author already exists
        const existingAuthor = await Author.findOne({ email });
        if (existingAuthor) {
            return res.status(400).json({ success: false, message: "Author with this email already exists" });
        }

        // Create new author
        const newAuthor = new Author({
            name,
            email,
            bio,
        });

        await newAuthor.save(); // Save author to the database

        res.status(201).json({ success: true, message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.log('Error creating author:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ------------- Get All Authors -------------
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({ success: true, authors });
    } catch (error) {
        console.log('Error fetching authors:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ------------- Get Author by ID -------------
const getAuthorById = async (req, res) => {
    try {
        const { authorId } = req.params;

        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        res.status(200).json({ success: true, author });
    } catch (error) {
        console.log('Error fetching author:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ------------- Update Author -------------
const updateAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        const { name, email, bio } = req.body;

        // Find author and update
        const updatedAuthor = await Author.findByIdAndUpdate(
            authorId,
            { name, email, bio },
            { new: true }  // Return the updated document
        );

        if (!updatedAuthor) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        res.status(200).json({ success: true, message: 'Author updated successfully', author: updatedAuthor });
    } catch (error) {
        console.log('Error updating author:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ------------- Delete Author -------------
const deleteAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;

        // Delete the author
        const deletedAuthor = await Author.findByIdAndDelete(authorId);

        if (!deletedAuthor) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        res.status(200).json({ success: true, message: 'Author deleted successfully' });
    } catch (error) {
        console.log('Error deleting author:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
};
