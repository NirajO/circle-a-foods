import mongoose from "mongoose";

const fuelPriceSchema = new mongoose.Schema(
  {
    regular: { type: Number, required: true },
    diesel: { type: Number, required: true},
  },
  { timestamps: true }
);

export default mongoose.model("FuelPrice", fuelPriceSchema);