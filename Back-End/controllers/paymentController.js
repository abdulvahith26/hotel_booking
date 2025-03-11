require("dotenv").config();
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");

// Create Razorpay Order
const createOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Validate request data
        if (!amount || !currency) {
            return res.status(400).json({ message: "Amount and currency are required" });
        }

        const options = {
            amount: amount * 100, // Razorpay accepts amount in paisa
            currency,
            receipt: `order_rcptid_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        console.log("Created Order:", order);

        res.status(200).json(order);
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ message: "Failed to create order", error });
    }
};

// Verify Payment
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        console.log("Received Order ID:", razorpay_order_id);
        console.log("Received Payment ID:", razorpay_payment_id);
        console.log("Received Signature:", razorpay_signature);

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment data received" });
        }

        // Generate signature to verify authenticity
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        console.log("Generated Signature:", generatedSignature);

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Update booking payment status
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" }, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Payment successful", booking: updatedBooking });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createOrder, verifyPayment };
