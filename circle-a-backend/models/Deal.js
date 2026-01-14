import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  product: { type: String, required: true},
  size: { type: String},
  dealPrice: { type: String, required: true},
  imageUrl: { type: String},
  active: { type: Boolean, default: true}
}, { timestamps: true});

export default mongoose.model("Deal", dealSchema);
