const express = require("express");
const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { validateObjectId } = require("../middleware/validate");

router.get("/wishlist", protect, getWishlist);
router.delete("/wishlist", protect, clearWishlist);
router.post("/wishlist/:productId", protect, validateObjectId("productId"), addToWishlist);
router.delete(
  "/wishlist/:productId",
  protect,
  validateObjectId("productId"),
  removeFromWishlist
);

module.exports = router;
