import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

/* Get all reviews */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Post Review */
router.post("/", async (req, res) => {
  const { name, location, message, rating } = req.body;

  if (!name || !message || !rating) {
    return res.status(400).json({ error: "Name,rating and review are required "});
  }

  try {
    const review = new Review({ name, location, message, rating });
    await review.save();
    res.status(201).json(review);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review Deleted" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;