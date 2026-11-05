const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  const isProduction = process.env.NODE_ENV === "production";
  const statusCode = error.statusCode || 500;

  // Log server errors without exposing internals to the client.
  if (statusCode >= 500) {
    console.error("[Backend Error]:", err);
  }

  // Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // Mongoose duplicate key (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const message = `Duplicate value entered for ${field}. Please use another value.`;
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: message.join(", "),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please authenticate again.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }

  // Default server error
  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500 && isProduction
        ? "Internal Server Error"
        : error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
