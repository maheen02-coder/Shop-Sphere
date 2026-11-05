require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const catalog = require("../data/products.json");

const ADMIN = {
  name: "ShopSphere Admin",
  email: "admin@shopsphere.com",
  password: "Admin@123",
  role: "admin",
};

const DEMO_USER = {
  name: "Demo Shopper",
  email: "demo@shopsphere.com",
  password: "Demo@123",
  role: "user",
  phone: "03001234567",
  address: {
    street: "12 Gulberg Main Boulevard",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
  },
};

const upsertUser = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) {
    user.name = data.name;
    user.role = data.role;
    user.phone = data.phone || user.phone;
    if (data.address) user.address = data.address;
    // Re-hash only when the password is not the expected demo password
    const passwordMatches = await user.constructor
      .findById(user._id)
      .select("+password")
      .then((doc) => doc.matchPassword(data.password));
    if (!passwordMatches) {
      user.password = data.password;
    }
    await user.save();
    return user;
  }
  return User.create(data);
};

const shippingAddress = {
  fullName: DEMO_USER.name,
  phone: DEMO_USER.phone,
  street: DEMO_USER.address.street,
  city: DEMO_USER.address.city,
  state: DEMO_USER.address.state,
  postalCode: DEMO_USER.address.postalCode,
  country: DEMO_USER.address.country,
};

const seedDemoOrders = async (user, products) => {
  await Order.deleteMany({ user: user._id });

  const samples = [
    { product: products[0], status: "Delivered", payment: "PAID", daysAgo: 12 },
    { product: products[18], status: "Shipped", payment: "PENDING", daysAgo: 4 },
    { product: products[55], status: "Placed", payment: "PENDING", daysAgo: 1 },
  ].filter((sample) => sample.product);

  const orders = samples.map((sample, index) => {
    const placedAt = new Date(Date.now() - sample.daysAgo * 24 * 60 * 60 * 1000);
    const itemsPrice = sample.product.price;
    const shippingPrice = itemsPrice >= 5000 ? 0 : 200;

    return {
      orderNumber: `ORD-SEED-${1001 + index}`,
      user: user._id,
      orderItems: [
        {
          product: sample.product._id,
          name: sample.product.name,
          image: sample.product.image,
          price: sample.product.price,
          quantity: 1,
          size: sample.product.sizes?.[0] || "",
          color: sample.product.colors?.[0] || "",
        },
      ],
      shippingAddress,
      paymentMethod: "Cash on Delivery",
      paymentStatus: sample.payment,
      orderStatus: sample.status,
      itemsPrice,
      shippingPrice,
      totalPrice: itemsPrice + shippingPrice,
      notes: "",
      placedAt,
      deliveredAt: sample.status === "Delivered" ? placedAt : undefined,
    };
  });

  if (orders.length > 0) {
    await Order.insertMany(orders);
  }

  return orders.length;
};

const run = async () => {
  await connectDB();

  console.log("[Seed] Replacing product catalogue...");
  await Product.deleteMany({});
  const products = await Product.insertMany(catalog);
  console.log(`[Seed] Inserted ${products.length} products.`);

  const admin = await upsertUser(ADMIN);
  const demoUser = await upsertUser(DEMO_USER);
  console.log(`[Seed] Admin account ready: ${admin.email}`);
  console.log(`[Seed] Demo account ready: ${demoUser.email}`);

  const orderCount = await seedDemoOrders(demoUser, products);
  console.log(`[Seed] Inserted ${orderCount} demo orders.`);

  console.log("\n[Seed] Complete.");
  console.log("  Admin login: admin@shopsphere.com / Admin@123");
  console.log("  Demo login:  demo@shopsphere.com / Demo@123");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch(async (error) => {
  console.error("[Seed] Failed:", error);
  await mongoose.connection.close();
  process.exit(1);
});
