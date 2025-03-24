// import express from "express"; 
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(cors({
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

//End Points
app.use("/api/auth" , authRoutes);
app.use("/api/hotels" , hotelRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/payment", paymentRoutes);


// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Debugging (Remove in production)
console.log("✅ PORT:", PORT);
console.log("✅ MONGO_URI:", MONGO_URI ? "Loaded" : "Not Found");

// MongoDB Connection & Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
