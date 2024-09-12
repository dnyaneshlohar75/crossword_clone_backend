const express = require("express");
const {
  reviewController,
  addbookController,
  removeBookController,
  getBooksByCategoryController,
  getBookById,
  getAllBooks,
} = require("../controllers/bookController");
const Book = require("../models/bookModel");

const router = express.Router();

router.post("/addbook", addbookController);

router.get("/category/:category", getBooksByCategoryController);

router.get("/allbook", getAllBooks);

router.get("/:id", getBookById);

router.delete("/removebook", removeBookController);

router.get("/find/:query",async (req, res) => {

    const { query } = req.params;
    try {
      const books = await Book.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
        ],
      });
      return res.json({
        message: "found",
        success: true,
        books
      });
    } catch (error) {
      console.error("Error searching:", error);
      return res.json({
        success: false
      })
    }
  }
);

router.post("/review", reviewController);

module.exports = router;
