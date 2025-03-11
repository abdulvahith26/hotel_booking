const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel")

// Crt new booking
const createBooking= async(req,res) =>{
    try{
        const {hotelId,checkInDate,checkOutDate,totalPrice}= req.body;
        const hotel = await Hotel.findById(hotelId);
        if(!hotel) return res.status(404).json({message: "Hotel not found", error});
        const booking = new Booking({
            user: req.user.id,
            hotel:hotelId,
            checkInDate,
            checkOutDate,
            totalPrice,
        });
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking)
    } catch(error){
        res.status(500).json({message: "Server error",error});
    }
};


// Get bookings -> user
const getUserBookings = async( req,res)=>{
    try{
        const bookings = await Booking.find({user:req.user.id}).populate("hotel");
        res.status(200).json(bookings)
    } catch(error){
        res.status(500).json({message : "Server error" , error})
        log
    }
}; 

// Get all bookings (Admin only)
const getAllBookings = async(req,res)=>{
    try{
        const bookings = await Booking.find().populate("hotel user");
        res.status(200).json(bookings);
    } catch(error){
        res.status(500).json({message: "Server error"});
    }
};
// Update booking status (Admin only)
const updateBookingStatus = async(req,res) =>{
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking) return res.status(404).json({message: "Booking not found"});
        booking.paymentStatus = req.body.paymentStatus || booking.paymentStatus
        await booking.save();
        res.status(200).json(booking);
    } catch(error){
        res.status(500).json({message : "Server error" , error});
        console.log(error);
    }
};

module.exports ={createBooking, getUserBookings, getAllBookings, updateBookingStatus};
