const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", require: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, require: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
