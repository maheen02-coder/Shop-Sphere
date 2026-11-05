const User = require("../models/User");
const Product = require("../models/Product");

// @desc    Get current user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user.wishlist.some((id) => id.toString() === productId)) {
      user.wishlist.push(product._id);
      await user.save();
    }

    const updatedUser = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist.",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/users/wishlist
// @access  Private
exports.clearWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Wishlist cleared.",
      wishlist: [],
    });
  } catch (error) {
    next(error);
  }
};
