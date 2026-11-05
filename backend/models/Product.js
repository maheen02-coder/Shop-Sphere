const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    subCategory: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    collectionType: {
      type: String,
      trim: true,
      default: "",
    },
    brand: {
      type: String,
      trim: true,
      default: "ShopSphere",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    salePrice: {
      type: Number,
      default: null,
      min: [0, "Sale price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    images: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    material: {
      type: String,
      trim: true,
      default: "",
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    care: {
      type: String,
      trim: true,
      default: "",
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [0, "Stock cannot be negative"],
      default: 25,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 12,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug before saving
productSchema.pre("save", function () {
  if (this.isModified("name") || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

module.exports = mongoose.model("Product", productSchema);
