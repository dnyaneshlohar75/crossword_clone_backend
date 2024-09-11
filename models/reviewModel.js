const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Book",
  },
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
