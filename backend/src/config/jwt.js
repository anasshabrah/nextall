// File: backend/src/config/jwt.js
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT tokens.
 * It expects the token in the Authorization header in the format "Bearer <token>".
 * If verification succeeds, the decoded payload is set on req.user.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET || "123456", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failed to authenticate token",
        error: err,
      });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
