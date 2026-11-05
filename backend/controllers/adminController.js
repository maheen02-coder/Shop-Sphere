const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Get dashboard metrics & statistics
// @route   GET /api/admin/stats
// @access  Private / Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [orderStats, totalProducts, lowStockProducts, totalUsers, recentOrders] =
      await Promise.all([
        Order.aggregate([
          {
            $facet: {
              total: [{ $count: "value" }],
              statusCounts: [{ $group: { _id: "$orderStatus", count: { $sum: 1 } } }],
              paymentCounts: [{ $group: { _id: "$paymentStatus", count: { $sum: 1 } } }],
              revenue: [
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
              ],
            },
          },
        ]),
        Product.countDocuments(),
        Product.countDocuments({ stock: { $lte: 5 } }),
        User.countDocuments(),
        Order.find()
          .populate("user", "name email")
          .sort({ createdAt: -1 })
          .limit(6)
          .lean(),
      ]);

    const facets = orderStats[0] || {};
    const totalOrders = facets.total?.[0]?.value || 0;
    const statusCounts = Object.fromEntries(
      (facets.statusCounts || []).map((entry) => [entry._id, entry.count])
    );
    const paymentCounts = Object.fromEntries(
      (facets.paymentCounts || []).map((entry) => [entry._id, entry.count])
    );
    const revenue = facets.revenue?.[0] || {
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
          placed: statusCounts.Placed || 0,
          processing: statusCounts.Processing || 0,
          shipped: statusCounts.Shipped || 0,
          delivered: statusCounts.Delivered || 0,
          cancelled: statusCounts.Cancelled || 0,
        },
        paymentCounts: {
          pending: paymentCounts.PENDING || 0,
          paid: paymentCounts.PAID || 0,
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
        .limit(limitNum)
        .lean(),
      User.countDocuments(query),
    ]);

    // Attach order counts in a single aggregation instead of one query per user
    const orderCounts = users.length
      ? await Order.aggregate([
          { $match: { user: { $in: users.map((u) => u._id) } } },
          { $group: { _id: "$user", count: { $sum: 1 } } },
        ])
      : [];

    const countByUser = new Map(
      orderCounts.map((entry) => [String(entry._id), entry.count])
    );

    const usersWithOrderCounts = users.map((u) => ({
      ...u,
      orderCount: countByUser.get(String(u._id)) || 0,
    }));

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
