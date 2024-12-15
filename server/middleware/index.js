const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {Admin} = require("../models/server");

// Database Configuration
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({message: "No token, authorization denied"});
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin user
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({message: "Token is not valid"});
    }

    // Attach admin to request object
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({message: "Token is not valid"});
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    // Find admin by username
    const admin = await Admin.findOne({username});

    if (!admin) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    // Create and return JWT token
    const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
};

module.exports = {
  connectDB,
  authMiddleware,
  login,
};
