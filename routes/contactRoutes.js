const express=require("express");
const Contact=require("../models/Contact");
const verifyToken=require("../middleware/authMiddleware")
const router=express.Router();

//get all contacts
router.get("/", verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//post contacts
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
  message: "Your message sent successfully! I'll get back to you soon. 💌",
  contact,
});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


//update contact
router.put("/:id",verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      message: "Contact updated successfully",
      contact: updatedContact
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//delete contact
router.delete("/:id",verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      message: "Contact deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports=router;