const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Get dashboard metrics & statistics
// @route   GET /api/admin/stats
// @access  Private / Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalOrders,
      placedOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      pendingPaymentOrders,
      paidPaymentOrders,
      totalProducts,
      lowStockProducts,
      totalUsers,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "Placed" }),
      Order.countDocuments({ orderStatus: "Processing" }),
      Order.countDocuments({ orderStatus: "Shipped" }),
      Order.countDocuments({ orderStatus: "Delivered" }),
      Order.countDocuments({ orderStatus: "Cancelled" }),
      Order.countDocuments({ paymentStatus: "PENDING" }),
      Order.countDocuments({ paymentStatus: "PAID" }),
      Product.countDocuments(),
      Product.countDocuments({ stock: { $lte: 5 } }),
      User.countDocuments(),
      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(6),
    ]);

    // Aggregate revenue
    const revenueData = await Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalCollected: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "PAID"] }, "$totalPrice", 0],
            },
          },
          totalPending: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "PENDING"] }, "$totalPrice", 0],
            },
          },
        },
      },
    ]);

    const revenue = revenueData[0] || {
      totalRevenue: 0,
      totalCollected: 0,
      totalPending: 0,
    };

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue: revenue.totalRevenue,
        totalCollected: revenue.totalCollected,
        totalPending: revenue.totalPending,
        totalOrders,
        statusCounts: {
          placed: placedOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
        },
        paymentCounts: {
          pending: pendingPaymentOrders,
          paid: paidPaymentOrders,
        },
        totalProducts,
        lowStockProducts,
        totalUsers,
      },
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users with order counts
// @route   GET /api/admin/users
// @access  Private / Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (search && typeof search === "string" && search.trim()) {
      const clean = search.trim();
      query.$or = [
        { name: { $regex: clean, $options: "i" } },
        { email: { $regex: clean, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [users, totalCount] = await Promise.all([
      User.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      User.countDocuments(query),
    ]);

    // Attach order count to each user
    const usersWithOrderCounts = await Promise.all(
      users.map(async (u) => {
        const orderCount = await Order.countDocuments({ user: u._id });
        return {
          ...u.toObject(),
          orderCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: users.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      users: usersWithOrderCounts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/admin/users/:id/role
// @access  Private / Admin
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Valid role ('user' or 'admin') is required.",
      });
    }

    // Safety: prevent admin from demoting self
    if (req.params.id === req.user._id.toString() && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Security restriction: You cannot demote your own administrator account.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User '${user.name}' role updated to '${role}'.`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private / Admin
exports.deleteUser = async (req, res, next) => {
  try {
    // Safety: prevent admin from deleting self
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Security restriction: You cannot delete your own account.",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User '${user.name}' deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
