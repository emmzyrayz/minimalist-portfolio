const {Experience} = require("../models/server");

const createExperience = async (req, res) => {
  const {
    companyName,
    position,
    companyLogo,
    startDate,
    endDate,
    description,
    responsibilities,
  } = req.body;

  try {
    const newExperience = new Experience({
      companyName,
      position,
      companyLogo,
      startDate,
      endDate,
      description,
      responsibilities,
    });
    await newExperience.save();
    res
      .status(201)
      .json({
        message: "Experience created successfully!",
        experience: newExperience,
      });
  } catch (error) {
    res.status(500).json({message: "Error creating experience", error});
  }
};

const updateExperience = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const updatedExperience = await Experience.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedExperience) {
      return res.status(404).json({message: "Experience not found"});
    }
    res.json({
      message: "Experience updated successfully!",
      experience: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({message: "Error updating experience", error});
  }
};

const deleteExperience = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) {
      return res.status(404).json({message: "Experience not found"});
    }
    res.json({message: "Experience deleted successfully!"});
  } catch (error) {
    res.status(500).json({message: "Error deleting experience", error});
  }
};

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({message: "Error fetching experiences", error});
  }
};

module.exports = {
  createExperience,
  updateExperience,
  deleteExperience,
  getExperiences,
};