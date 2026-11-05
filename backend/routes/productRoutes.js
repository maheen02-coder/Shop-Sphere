const express = require("express");
const router = express.Router();

const {
  getProducts,
  getFeaturedProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/admin");
const { validateObjectId } = require("../middleware/validate");

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin"), createProduct);

router.get("/featured", getFeaturedProducts);
router.get("/categories", getCategories);

router
  .route("/:id")
  .get(validateObjectId("id"), getProductById)
  .put(protect, authorize("admin"), validateObjectId("id"), updateProduct)
  .delete(protect, authorize("admin"), validateObjectId("id"), deleteProduct);

router.patch(
  "/:id/stock",
  protect,
  authorize("admin"),
  validateObjectId("id"),
  updateStock
);

module.exports = router;
