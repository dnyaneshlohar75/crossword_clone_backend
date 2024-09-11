const express = require('express');
const { reviewController, addbookController,removeBookController, getBooksByCategoryController,  getBookById, getAllBooks } = require('../controllers/bookController');
const Book = require('../models/bookModel');

const router = express.Router();

router.post('/addbook', addbookController);

router.get('/category/:category', getBooksByCategoryController);

router.get('/allbook',  getAllBooks);

router.get("/:id", getBookById)

router.delete('/removebook', removeBookController);

router.get('/find/:name?/:author?', async (req, res) => {

    const { name, author } = req.params;
    const query = {};

    if (name) {
        query.name = { $regex: new RegExp(name, "i") };
      }
      if (author) {
        query.category = { $regex: new RegExp(author, "i") };
      }

    const allBooks = await Book.find(query);

    if(allBooks) {
        return res.json({
            success: true,
            message: "All  books fetched..",
            books: allBooks
        }).status(200);
    }

    return res.json({
        success: false,
        message: "Books not found..",
    }).status(404)
})

router.post("/review", reviewController);

module.exports = router;
