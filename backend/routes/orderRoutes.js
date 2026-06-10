const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  cancelOrderItem,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/myorders/:user", getMyOrders);

router.put("/:orderId/cancel", cancelOrderItem);
router.get("/all", getAllOrders);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);
module.exports = router;