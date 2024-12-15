const {Testimonial} = require("../models/server");

const createTestimonial = async (req, res) => {
  const {user, testimony, project, isAnonymous} = req.body;

  try {
    const newTestimonial = new Testimonial({
      user,
      testimony,
      project,
      isAnonymous,
    });
    await newTestimonial.save();
    res
      .status(201)
      .json({
        message: "Testimonial created successfully!",
        testimonial: newTestimonial,
      });
  } catch (error) {
    res.status(500).json({message: "Error creating testimonial", error});
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate("project");
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({message: "Error fetching testimonials", error});
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
};