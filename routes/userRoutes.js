const express = require("express");
const router = express.Router();

const { loginController, registerController } = require("../controllers/authController");
const { myWishlistController, addProductWishlist } = require("../controllers/cartController");

router.post("/signup", registerController);

router.post("/login", loginController);

router.post("/mywishlist", myWishlistController);

router.post("/wishlist/add", addProductWishlist);

module.exports = router;
