const mongoose = require("mongoose");

// User Model (for newsletter subscribers)
// User Model (for newsletter subscribers)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() { return this.role === 'admin'; }, // Password required only for admin
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// Skill Model
const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String, // URL or file path to skill icon
    required: true,
  },
  proficiencyPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
    default: "Other",
  },
});

// Experience Model
const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String, // URL or file path to company logo
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null, // null for current job
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: [String],
});

// Project Model
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // URLs or file paths to project images
      required: true,
    },
  ],
  githubLink: {
    type: String,
    trim: true,
  },
  projectLink: {
    type: String,
    trim: true,
  },
  technologies: [String],
  dateCompleted: {
    type: Date,
    default: Date.now,
  },
});

// Testimonial Model
const TestimonialSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    profileImage: {
      type: String, // URL or file path to user image
      default: "default-avatar.png",
    },
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  testimony: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
});

// Contact Message Model
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Replied", "Closed"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Admin/Auth Model
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
});

// Create and export models
module.exports = {
  User: mongoose.model("User", UserSchema),
  Skill: mongoose.model("Skill", SkillSchema),
  Experience: mongoose.model("Experience", ExperienceSchema),
  Project: mongoose.model("Project", ProjectSchema),
  Testimonial: mongoose.model("Testimonial", TestimonialSchema),
  Contact: mongoose.model("Contact", ContactSchema),
  Admin: mongoose.model("Admin", AdminSchema),
};