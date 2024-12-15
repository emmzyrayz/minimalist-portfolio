const {Project} = require("../models/server");

const createProject = async (req, res) => {
  const {name, description, images, githubLink, projectLink, technologies} =
    req.body;

  try {
    const newProject = new Project({
      name,
      description,
      images,
      githubLink,
      projectLink,
      technologies,
    });
    await newProject.save();
    res
      .status(201)
      .json({message: "Project created successfully!", project: newProject});
  } catch (error) {
    res.status(500).json({message: "Error creating project", error});
  }
};

const updateProject = async (req, res) => {
  const {id} = req.params;
  const updates = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProject) {
      return res.status(404).json({message: "Project not found"});
    }
    res.json({
      message: "Project updated successfully!",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({message: "Error updating project", error});
  }
};

const deleteProject = async (req, res) => {
  const {id} = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({message: "Project not found"});
    }
    res.json({message: "Project deleted successfully!"});
  } catch (error) {
    res.status(500).json({message: "Error deleting project", error});
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({message: "Error fetching projects", error});
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
};