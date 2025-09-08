const express = require("express");
const router = express.Router();
const { Membership } = require("../db");

// POST → Add new membership
router.post("/", async (req, res) => {
  try {
    const membership = new Membership(req.body);
    await membership.save();
    res.status(201).json({ success: true, data: membership });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET → Get all memberships
router.get("/", async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
