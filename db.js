const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  plan: String,
  amount: Number,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

const ShopOrderSchema = new mongoose.Schema({
  product: String,
  price: Number,
  customerName: String,
  email: String,
  phone: String,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Membership: mongoose.model("Membership", MembershipSchema),
  ShopOrder: mongoose.model("ShopOrder", ShopOrderSchema),
  Contact: mongoose.model("Contact", ContactSchema),
};
