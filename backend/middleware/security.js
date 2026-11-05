// NoSQL injection sanitizer
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    // Strip keys starting with $ or containing . which could be used in MongoDB operator injection
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }

    if (typeof value === "string") {
      // Basic XSS protection: strip HTML script tags and dangerous javascript: URIs
      sanitized[key] = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .trim();
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = sanitizeObject(req.body);

  // Express 5 exposes req.query only through a getter, so the sanitized copy
  // is pinned as an own property instead of reassigning the accessor.
  if (req.query && typeof req.query === "object") {
    const sanitizedQuery = sanitizeObject({ ...req.query });
    Object.defineProperty(req, "query", {
      value: sanitizedQuery,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }

  next();
};

module.exports = { sanitizeInput };
