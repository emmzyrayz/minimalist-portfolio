const {Contact} = require("../models/server");

const createContactMessage = async (req, res) => {
  const {name, email, message} = req.body;

  try {
    const newContactMessage = new Contact({name, email, message});
    await newContactMessage.save();
    res.status(201).json({message: "Message sent successfully!"});
  } catch (error) {
    res.status(500).json({message: "Error sending message", error});
  }
};

module.exports = {createContactMessage};