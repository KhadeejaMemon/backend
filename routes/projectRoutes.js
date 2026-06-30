const express = require("express");
const Project = require("../models/Project");
const verifyToken=require("../middleware/authMiddleware")
const upload = require("../middleware/upload");
const router = express.Router();


//get all project
router.get("/", async (req, res) => {

try{

const projects=await Project.find();

res.json(projects);

}

catch(err){

res.status(500).json({

message:err.message

});

}

});

//create project
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
try{
    const {
  title,
  description,
  githubLink,
  demoLink,
  technologies,
  featured,
} = req.body;

const image = req.file
  ? `/uploads/${req.file.filename}`
  : "";
   const project = await Project.create({
  title,
  description,
  image,
  githubLink,
  demoLink,
  technologies,
  featured,
});
    res.status(201).json({
        message:"project added successfully",
        project
    })
}catch(err){
res.status(500).json({
    message:err.message
});
}
});

//update project
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {

      const updateData = {
        title: req.body.title,
        description: req.body.description,
        githubLink: req.body.githubLink,
        demoLink: req.body.demoLink,
        featured: req.body.featured === "true",
        technologies: req.body.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(project);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

//delete project
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;