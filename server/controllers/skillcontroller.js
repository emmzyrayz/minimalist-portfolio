const {Skill} = require("../models/server");

const createSkill = async (req, res) => {
  const {name, icon, proficiencyPercent} = req.body;

  try {
    const newSkill = new Skill({name, icon, proficiencyPercent});
    await newSkill.save();
    res
      .status(201)
      .json({message: "Skill created successfully!", skill: newSkill});
  } catch (error) {
    res.status(500).json({message: "Error creating skill", error});
  }
};

const updateSkill = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const updatedSkill = await Skill.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedSkill) {
      return res.status(404).json({message: "Skill not found"});
    }
    res.json({message: "Skill updated successfully!", skill: updatedSkill});
  } catch (error) {
    res.status(500).json({message: "Error updating skill", error});
  }
};

const deleteSkill = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({message: "Skill not found"});
    }
    res.json({message: "Skill deleted successfully!"});
  } catch (error) {
    res.status(500).json({message: "Error deleting skill", error});
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({message: "Error fetching skills", error});
  }
};

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkills,
};