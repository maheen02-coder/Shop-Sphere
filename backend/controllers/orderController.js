const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Create new Cash on Delivery order with backend price calculation and stock verification
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, notes } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your shopping bag is empty. Please add items before checkout.",
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete shipping details (full name, phone, street, city, province/state, and postal code).",
      });
    }

    // Process and verify each item against the MongoDB database
    // Frontend prices, totals, or stock are NEVER trusted
    const verifiedOrderItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
      const productId = item.productId || item.product || item.id;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Each order item must contain a valid product ID.",
        });
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);

      // Find product in DB. Static catalogue pages can send numeric or
      // prefixed IDs, so fall back to slug/name lookups for those.
      let product = null;
      if (typeof productId === "string" && mongoose.Types.ObjectId.isValid(productId)) {
        product = await Product.findById(productId);
      }
      if (!product) {
        const candidates = await Product.find({
          $or: [{ slug: String(productId) }, { name: item.name }],
        }).limit(10);
        const price = Number(item.price);
        product =
          candidates.find((candidate) => candidate.price === price) ||
          candidates[0] ||
          null;
      }

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product '${item.name || productId}' was not found in catalog.`,
        });
      }

      // Verify stock
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for '${product.name}'. Requested: ${quantity}, Available: ${product.stock}.`,
        });
      }

      // Use strictly verified database price
      const verifiedPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
      itemsPrice += verifiedPrice * quantity;

      verifiedOrderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: verifiedPrice,
        quantity,
        size: item.size || "",
        color: item.color || "",
      });
    }

    // Shipping calculation: Free delivery on orders of Rs. 5,000 or more, otherwise flat Rs. 200
    const shippingPrice = itemsPrice >= 5000 ? 0 : 200;
    const totalPrice = itemsPrice + shippingPrice;

    // Atomically decrement stock
    for (const item of verifiedOrderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Generate unique human-friendly order identifier
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    // Create the Cash on Delivery order
    const order = await Order.create({
      orderNumber,
      user: req.user._id, // Strict authentication: never trust user ID from body
      orderItems: verifiedOrderItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        street: shippingAddress.street.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        postalCode: shippingAddress.postalCode.trim(),
        country: shippingAddress.country ? shippingAddress.country.trim() : "Pakistan",
      },
      paymentMethod: "Cash on Delivery",
      paymentStatus: "PENDING", // Cash on Delivery starts as PENDING until collected
      orderStatus: "Placed",
      itemsPrice,
      shippingPrice,
      totalPrice,
      notes: notes ? String(notes).trim().slice(0, 500) : "",
      placedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully! Payment will be collected in cash upon delivery.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders (IDOR protected)
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID (IDOR protected: user can only see own, admin can see all)
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("orderItems.product", "name image price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // IDOR check: Verify the user owns this order, or is an admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not have permission to view this order.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    User cancel their own order (only if status is 'Placed')
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelMyOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // IDOR protection
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only cancel your own orders.",
      });
    }

    if (order.orderStatus !== "Placed") {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled because it is already '${order.orderStatus}'. Only 'Placed' orders can be cancelled.`,
      });
    }

    // Restore stock
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    order.cancellationReason = req.body.reason || "Cancelled by customer";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order has been cancelled and items returned to stock.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private / Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, page = 1, limit = 20 } = req.query;

    const query = {};
    if (orderStatus && orderStatus !== "All") {
      query.orderStatus = orderStatus;
    }
    if (paymentStatus && paymentStatus !== "All") {
      query.paymentStatus = paymentStatus;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [orders, totalCount] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: orders.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private / Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Allowed: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // If changing to Cancelled and was not cancelled before, restore stock
    if (orderStatus === "Cancelled" && order.orderStatus !== "Cancelled") {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
      order.cancelledAt = new Date();
    }

    // If changing to Delivered, record delivery timestamp
    if (orderStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to '${orderStatus}'.`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment status for Cash on Delivery (Admin only)
// @route   PUT /api/orders/:id/payment
// @access  Private / Admin
exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;

    const validStatuses = ["PENDING", "PAID", "FAILED"];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment status. Allowed: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Payment status updated to '${paymentStatus}'.`,
      order,
    });
  } catch (error) {
    next(error);
  }
};
