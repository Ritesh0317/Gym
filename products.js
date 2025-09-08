import express from 'express';
const router = express.Router();

// Static catalog matching your shop.html
const PRODUCTS = [
  { sku: 'WHEY-CHOC', name: 'Whey Protein (Chocolate)', price: 2499 },
  { sku: 'CREA-MONO', name: 'Creatine Monohydrate', price: 999 },
  { sku: 'BCAA-WM', name: 'BCAA Energy (Watermelon)', price: 1299 },
  { sku: 'PRE-WO', name: 'Pre-Workout Booster', price: 1499 },
  { sku: 'DB-SET', name: 'Adjustable Dumbbell Set', price: 3999 },
  { sku: 'RB-SET', name: 'Resistance Bands Set', price: 799 }
];

router.get('/', (_req, res) => res.json(PRODUCTS));

export default router;
