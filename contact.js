const express = require("express");
const router = express.Router();
const { Contact } = require("../db");

// POST → Save new contact message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET → Get all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
