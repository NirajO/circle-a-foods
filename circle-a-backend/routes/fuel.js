import express from "express";
import FuelPrice from "../models/FuelPrice.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Get fuel prices
router.get("/", async (req, res) => {
  const fuel = await FuelPrice.findOne();
  res.json(fuel);
});

// Create or update fuel prices (Admin)
router.post("/", adminAuth, async (req, res) => {
  const { regular, diesel } = req.body;

  let fuel = await FuelPrice.findOne();

  if (fuel) {
    fuel.regular = regular;
    fuel.diesel = diesel;
    await fuel.save();
  }
  else {
    fuel = await FuelPrice.create({ regular, diesel })
  }

  res.json(fuel);
});

export default router;