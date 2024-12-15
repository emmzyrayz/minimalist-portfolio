const {User} = require("../models/server");
const bcrypt = require("bcryptjs");

const subscribeUser = async (req, res) => {
  const {name, email, password, role} = req.body;

  // Validate role
  if (role && !["user", "admin"].includes(role)) {
    return res.status(400).json({message: "Invalid role specified."});
  }

  try {
    // Hash password if provided and if the role is admin
    if (role === "admin" && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({name, email, password: hashedPassword, role});
      await newUser.save();
      return res.status(201).json({message: "Admin subscribed successfully!"});
    } else if (role === "user") {
      const newUser = new User({name, email, role});
      await newUser.save();
      return res.status(201).json({message: "User  subscribed successfully!"});
    } else {
      return res
        .status(400)
        .json({message: "Password is required for admin role."});
    }
  } catch (error) {
    res.status(500).json({message: "Error subscribing user", error});
  }
};

module.exports = {subscribeUser};
