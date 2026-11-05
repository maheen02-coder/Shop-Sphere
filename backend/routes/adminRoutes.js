const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/admin");
const { validateObjectId } = require("../middleware/validate");

router.use(protect, authorize("admin"));

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", validateObjectId("id"), updateUserRole);
router.delete("/users/:id", validateObjectId("id"), deleteUser);

module.exports = router;
