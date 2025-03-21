// File: backend/src/config/getUser.js

const Users = require("../models/User");

/**
 * Retrieves the authenticated user.
 * Requires that the JWT middleware has already set req.user.
 * If `requireVerify` is true (default), then the user must be verified.
 */
exports.getUser = async (req, requireVerify = true) => {
  if (!req.user) {
    throw new Error("You must be logged in.");
  }
  const user = await Users.findById(req.user._id);
  if (!user) {
    throw new Error("User not found.");
  }
  if (requireVerify && !user.isVerified) {
    throw new Error("User email is not verified.");
  }
  return user;
};

/**
 * Retrieves an admin user.
 * Throws an error if the logged‐in user does not have an admin role.
 */
exports.getAdmin = async (req) => {
  if (!req.user) {
    throw new Error("You must be logged in.");
  }
  const user = await Users.findById(req.user._id);
  if (!user) {
    throw new Error("User not found.");
  }
  if (!user.role.includes("admin")) {
    throw new Error("Access denied.");
  }
  return user;
};

/**
 * Retrieves a vendor user.
 * Throws an error if the logged‐in user does not have a vendor role.
 */
exports.getVendor = async (req) => {
  if (!req.user) {
    throw new Error("You must be logged in.");
  }
  const user = await Users.findById(req.user._id);
  if (!user) {
    throw new Error("User not found.");
  }
  if (!user.role.includes("vendor")) {
    throw new Error("Access denied.");
  }
  return user;
};
