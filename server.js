const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
// const dns = require("dns");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// =====================
// MongoDB Connection
// =====================
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL);

  isConnected = true;
  console.log("MongoDB Connected");
}

// Connect DB BEFORE routes
app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// =====================
// Middlewares
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-smoky-rho-67.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// =====================
// Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contacts", contactRoutes);

// =====================
// Home
// =====================

app.get("/", (req, res) => {
  res.send("Portfolio backend running");
});

module.exports = app;