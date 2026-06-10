const Cart = require("../models/cart");


const addToCart = async (req, res) => {
  try {
    const { user, product, name, price, image, quantity } = req.body;

    const cartItem = await Cart.create({
      user,
      product,
      name,
      price,
      image,
      quantity
    });

    res.status(201).json({
      message: "Product added to cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const { user } = req.query;

    const cart = await Cart.find({ user });

    res.json(cart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addToCart,
  getCart,
  removeFromCart
};