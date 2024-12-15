const {Admin} = require("../models/server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

module.exports = {login};