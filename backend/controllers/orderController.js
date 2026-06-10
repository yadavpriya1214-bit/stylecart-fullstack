const Order = require("../models/order");


const createOrder = async (req, res) => {
  try {
    const { cartItems, user } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    
    const item = cartItems[0];

    const order = await Order.create({
      user,
      product: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.qty,
      totalPrice: item.price * item.qty
    });

    res.status(201).json(order);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const getMyOrders = async (req, res) => {
  try {
    const { user } = req.params;

    const orders = await Order.find({ user, status: { $ne: "Cancelled"}, });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order removed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;

    const updated = await order.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelOrderItem = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cleanOldOrders = async (req, res) => {
  try {
    const result = await Order.deleteMany({
      $or: [
        { name: { $exists: false } },
        { price: { $exists: false } },
        { quantity: { $exists: false } }
      ]
    });

    res.json({
      message: "Old broken orders removed",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrderItem,
  cleanOldOrders

};