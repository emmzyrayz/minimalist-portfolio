require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connectDB} = require("./config/database");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/userroutes");
const skillRoutes = require("./routes/skillroutes");
const experienceRoutes = require("./routes/experienceroutes");
const projectRoutes = require("./routes/projectroutes");
const testimonialRoutes = require("./routes/testimonial");
const contactRoutes = require("./routes/contactroutes");
const aboutMeRoutes = require("./routes/aboutsroutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutMeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
