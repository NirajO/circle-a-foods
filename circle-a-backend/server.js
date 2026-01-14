import "./env.js";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dealsRoutes from "./routes/deals.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import fuelRoutes from "./routes/fuel.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();

app.use(cors({
  origin: [
    "https://locahost:5173",
    "https://circle-a-foods.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/deals", dealsRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Backend running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error(err));
