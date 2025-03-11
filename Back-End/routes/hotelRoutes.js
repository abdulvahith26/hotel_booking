const express = require("express");
const {protect} = require("../middleware/authmiddleware");
const {getHotels,getHotelById, createHotel,updateHotel, deleteHotel } = require("../controllers/hotelController");
const router = express.Router();

router.get("/",getHotels);
router.get("/:id",getHotelById);
router.post("/",protect,createHotel);
router.put("/:id" , protect,updateHotel);
router.delete("/:id",protect, deleteHotel)


module.exports = router;


