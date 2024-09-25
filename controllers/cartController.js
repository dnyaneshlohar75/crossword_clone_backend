const Cart = require('../models/cartModel');
const Wishlist = require('../models/wishlistModel');

const addToCartController = async (req, res) => {

  try {
    const { userId, productId, quantity = 1 } = req.body;

    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      const newCart = new Cart({ userId, products: [] });
      await newCart.save();
      
      return res.status(201).json({ message: "Cart created successfully" });
    }

    const productIndex = existingCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      existingCart.products[productIndex].quantity += quantity;
    }    
    else {
      existingCart.products.push({ product: productId, quantity });
    }

    await existingCart.save();
    return res.status(200).json({ message: "Product added to cart successfully", success: true, carts: existingCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  const myWishlistController =  async (req, res) => {

    const { userId } = req.body;
  
    const wishlists = await Wishlist.find({ userId }).populate("products.product");
  
    if (wishlists) {
      return res.json({
          success: true,
          message: "wishlist data",
          wishlists,
        })
        .status(200);
    }
  
    return res
      .json({
        success: false,
        message: "Your wishlist is empty",
      })
      .status(404);
  
  }

  const addProductWishlist = async (req, res) => {
    try {
      const { userId, productId } = req.body;

      console.log("Wishlist controller")
  
      const existingWishlist = await Wishlist.findOne({ userId });
  
      if (!existingWishlist) {
        const wishlist = new Wishlist({ userId, products: [] });
        await wishlist.save();
        
        res.status(201).json({ message: "Wishlist created successfully" });
      }
  
      const productIndex = existingWishlist.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex !== -1) {
        existingWishlist.products[productIndex].quantity += quantity;
      }    
      else {
        existingWishlist.products.push({ product: productId, quantity });
      }
  
      await existingWishlist.save();
      return res.status(200).json({ message: "Product added to wishlist successfully", wishlist: existingWishlist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }

  }

  const removeProductWishlist = async (req, res) => {

  }


  const getAllCartsController = async (req, res) => {
    const { userId } = req.body;
  
    const carts = await Cart.find({ userId }).populate("products.product");
  
    if (carts) {
      return res
        .json({
          success: true,
          message: "cart data",
          carts,
        })
        .status(200);
    }
  
    return res
      .json({
        success: false,
        message: "Your cart is empty",
      })
      .status(404);
  };

module.exports = {
    addToCartController,
    myWishlistController,
    getAllCartsController,
    addProductWishlist,
    removeProductWishlist
};
