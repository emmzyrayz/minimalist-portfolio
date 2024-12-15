const {AboutMe} = require("../models/server"); // Assuming you have an AboutMe model

const getAboutMe = async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne(); // Assuming there's only one document
    res.json(aboutMe);
  } catch (error) {
    res.status(500).json({message: "Error fetching about me details", error});
  }
};

module.exports = {getAboutMe};
