// ======================= IMPORTS =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================= MIDDLEWARES =======================
app.use(cors());
app.use(express.json());

// ======================= DEBUG ENV CHECK =======================
console.log("DEBUG MONGO_URI =", process.env.MONGO_URI);

// ======================= DATABASE CONNECTION =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ======================= HEALTH ROUTE =======================
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running!" });
});

// ======================= SCHEMAS =======================

// Contact schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", ContactSchema);

// Membership schema
const MembershipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  plan: String,
  amount: Number,
  paymentId: String,
  date: { type: Date, default: Date.now }
});
const Membership = mongoose.model("Membership", MembershipSchema);

// Shop Order schema
const OrderSchema = new mongoose.Schema({
  product: String,
  customerName: String,
  email: String,
  quantity: Number,
  amount: Number,       // ✅ Added
  paymentId: String,    // ✅ Added
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", OrderSchema);

// ======================= ROUTES =======================

// ✅ Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMsg = new Contact({ name, email, message });
    await newMsg.save();
    res.json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Membership route
app.post("/api/membership", async (req, res) => {
  try {
    const { name, email, phone, plan, amount, paymentId } = req.body;
    const newMember = new Membership({ name, email, phone, plan, amount, paymentId });
    await newMember.save();
    res.json({ success: true, message: "Membership saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving membership:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Shop order route
app.post("/api/shop/order", async (req, res) => {
  try {
    const { product, customerName, email, quantity, amount, paymentId } = req.body;
    const newOrder = new Order({ product, customerName, email, quantity, amount, paymentId });
    await newOrder.save();
    res.json({ success: true, message: "Order saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving order:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ======================= SERVER START =======================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
