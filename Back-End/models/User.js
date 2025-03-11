const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookingHistory: [
      {
        hotelName: String,
        checkInDate: Date,
        checkOutDate: Date,
        totalAmount: Number,
        status: { type: String, enum: ["Confirmed", "Cancelled"], default: "Confirmed" }
      }
    ],
    paymentHistory: [
      {
        amount: Number,
        paymentMethod: String,
        transactionId: String,
        status: { type: String, enum: ["Success", "Failed"], default: "Success" },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
