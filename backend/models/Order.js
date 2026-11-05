const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (items) => items.length > 0,
        "Order must contain at least one item",
      ],
    },
    shippingAddress: {
      fullName: { type: String, required: [true, "Full name is required"] },
      phone: { type: String, required: [true, "Phone number is required"] },
      street: { type: String, required: [true, "Street address is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "Province/State is required"] },
      postalCode: { type: String, required: [true, "Postal code is required"] },
      country: { type: String, default: "Pakistan" },
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["PENDING", "PAID", "FAILED"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "PENDING",
      index: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
        message: "{VALUE} is not a valid order status",
      },
      default: "Placed",
      index: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
