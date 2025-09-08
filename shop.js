const express = require("express");
const router = express.Router();
const { ShopOrder } = require("../db");

// POST → Add new shop order
router.post("/", async (req, res) => {
  try {
    const order = new ShopOrder(req.body);
    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET → Get all shop orders
router.get("/", async (req, res) => {
  try {
    const orders = await ShopOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
