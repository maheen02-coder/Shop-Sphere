const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelMyOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/admin");
const { validateObjectId } = require("../middleware/validate");
const { orderLimiter } = require("../middleware/rateLimiter");

router
  .route("/")
  .post(protect, orderLimiter, createOrder)
  .get(protect, authorize("admin"), getAllOrders);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, validateObjectId("id"), getOrderById);
router.put("/:id/cancel", protect, validateObjectId("id"), cancelMyOrder);
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  validateObjectId("id"),
  updateOrderStatus
);
router.put(
  "/:id/payment",
  protect,
  authorize("admin"),
  validateObjectId("id"),
  updatePaymentStatus
);

module.exports = router;
