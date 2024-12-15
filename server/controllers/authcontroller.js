const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../models/server");

const router = express.Router();

// Login Controller
const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Find user by email
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    // For admin role, password is required
    if (user.role === "admin" && !password) {
      return res.status(400).json({message: "Password required for admin"});
    }

    // If admin, check password
    if (user.role === "admin") {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({message: "Invalid Credentials"});
      }
    }

    // Create and return JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {expiresIn: "30d"}
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
};

// Subscribe/Register User
const subscribeUser = async (req, res) => {
  const {name, email, password, role = "user", newsletter = false} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({message: "User with this email already exists"});
    }

    // Prepare user data
    const userData = {
      name,
      email,
      role,
      subscribedToNewsletter: newsletter,
    };

    // Handle password for admin
    if (role === "admin") {
      if (!password) {
        return res
          .status(400)
          .json({message: "Password is required for admin"});
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
    }

    // Create new user
    const newUser = new User(userData);
    await newUser.save();

    // Generate token for admin
    let token = null;
    if (role === "admin") {
      token = jwt.sign(
        {id: newUser._id, role: newUser.role},
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
      );
    }

    res.status(201).json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } subscribed successfully!`,
      ...(token && {token}),
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      message: "Error subscribing user",
      error: error.message,
    });
  }
};

// Token Validation Middleware
const validateToken = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({valid: false, message: "No token provided"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Additional check to verify user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({valid: false, message: "User not found"});
    }

    res.json({
      valid: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({valid: false, message: "Invalid token"});
  }
};

module.exports = {
  routes: router,
  login,
  subscribeUser,
  validateToken,
};
