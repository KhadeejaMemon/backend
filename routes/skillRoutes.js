const express=require("express");
const Skill=require("../models/Skill");
const verifyToken=require("../middleware/authMiddleware")
const router=express.Router();

//get all skills
router.get("/",async(req,res)=>{
const skills=await Skill.find();
res.json(skills)
});

//post skill
router.post("/", verifyToken, async (req, res) => {
  try {
    const skills = await Skill.insertMany(req.body);

    res.status(201).json({
      message: "Skills added successfully",
      skills,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


//update skill
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({
      message: "Skill updated successfully",
      skill: updatedSkill
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//delete skill
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({
      message: "Skill deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports=router;