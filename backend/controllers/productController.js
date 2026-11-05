const Product = require("../models/Product");

// Helper to escape regex special characters to prevent regex injection
const escapeRegex = (string) => {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// @desc    Get all products with search, filter, sort & pagination
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const {
      keyword,
      category,
      subCategory,
      collectionType,
      brand,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      page = 1,
      limit = 24,
    } = req.query;

    const query = {};

    // Search keyword
    if (keyword && typeof keyword === "string" && keyword.trim()) {
      const cleanKeyword = escapeRegex(keyword.trim());
      query.$or = [
        { name: { $regex: cleanKeyword, $options: "i" } },
        { description: { $regex: cleanKeyword, $options: "i" } },
        { brand: { $regex: cleanKeyword, $options: "i" } },
        { category: { $regex: cleanKeyword, $options: "i" } },
      ];
    }

    // Category filter
    if (category && typeof category === "string" && category !== "All") {
      query.category = { $regex: new RegExp(`^${escapeRegex(category.trim())}$`, "i") };
    }

    // SubCategory filter
    if (subCategory && typeof subCategory === "string" && subCategory !== "All") {
      query.subCategory = { $regex: new RegExp(`^${escapeRegex(subCategory.trim())}$`, "i") };
    }

    // Collection filter (Women, Men, Children)
    if (collectionType && typeof collectionType === "string" && collectionType !== "All") {
      query.collectionType = { $regex: new RegExp(`^${escapeRegex(collectionType.trim())}$`, "i") };
    }

    // Brand filter
    if (brand && typeof brand === "string" && brand !== "All") {
      query.brand = { $regex: new RegExp(`^${escapeRegex(brand.trim())}$`, "i") };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice && !isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Stock availability filter
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sortBy === "price-asc") {
      sortOption = { price: 1 };
    } else if (sortBy === "price-desc") {
      sortOption = { price: -1 };
    } else if (sortBy === "rating") {
      sortOption = { rating: -1 };
    } else if (sortBy === "name-asc") {
      sortOption = { name: 1 };
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
    const skip = (pageNum - 1) * limitNum;

    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get distinct categories with counts
// @route   GET /api/products/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      categories: categories.map((c) => ({ name: c._id, count: c.count })),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private / Admin
exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subCategory,
      collectionType,
      brand,
      price,
      salePrice,
      image,
      images,
      description,
      material,
      sizes,
      colors,
      care,
      stock,
      isFeatured,
      label,
    } = req.body;

    if (!name || !category || price === undefined || !image || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, category, price, image, description.",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      category: category.trim(),
      subCategory: subCategory ? subCategory.trim() : "",
      collectionType: collectionType ? collectionType.trim() : "",
      brand: brand ? brand.trim() : "ShopSphere",
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      image: image.trim(),
      images: Array.isArray(images) ? images : [],
      description: description.trim(),
      material: material ? material.trim() : "",
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      care: care ? care.trim() : "",
      stock: stock !== undefined ? Math.max(0, Number(stock)) : 20,
      isFeatured: Boolean(isFeatured),
      label: label ? label.trim() : "",
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private / Admin
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private / Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Quick update stock
// @route   PATCH /api/products/:id/stock
// @access  Private / Admin
exports.updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid stock count (non-negative number) is required.",
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { stock: Number(stock) } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock updated successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
};
