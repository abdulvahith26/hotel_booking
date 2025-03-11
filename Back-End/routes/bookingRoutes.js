const express = require ("express");
const { protect}  = require("../middleware/authmiddleware");
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
} = require("../controllers/bookingController");

const router = express.Router();
router.post("/" ,protect,createBooking);
router.get("/" , protect,getUserBookings);
router.get("/all", protect ,getAllBookings);
router.put("/:id",protect,updateBookingStatus);

module.exports = router;

