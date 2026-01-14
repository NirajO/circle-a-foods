import express from "express";
import Deal from "../models/Deal.js";
import upload from "../middleware/upload.js";
import adminAuth from "../middleware/adminAuth.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "circle-a-deals"},
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
}

/* GET all active deals */
router.get("/", async (req, res) => {
  const deals = await Deal.find({ active: true }).sort({ createdAt: -1 });
  res.json(deals);
});

/* CREATE deal */
router.post("/",adminAuth, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    const deal = new Deal({
      product: req.body.product,
      size: req.body.size,
      dealPrice: req.body.dealPrice,
      imageUrl,
    });

    await deal.save();
    res.status(201).json(deal);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE deal */
router.put("/:id", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const updates = {
      product: req.body.product,
      size: req.body.size,
      dealPrice: req.body.dealPrice,
    };

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      updates.imageUrl = uploaded.secure_url;
    }

    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      updates,
        { new: true }
    );

    if (!deal) {
      return res.status(404).json({ error: "Deal not found "});
    }

    res.json(deal);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE deal */
router.delete("/:id", adminAuth, async (req, res) => {
  try{
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deal deleted successfully" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
