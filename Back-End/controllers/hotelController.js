const Hotel = require("../models/Hotel");

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const { name, location, price, rating, description, images, availableRooms, amenities } = req.body;

    const hotel = new Hotel({
      name,
      location,
      price,
      rating,
      description,
      images,
      availableRooms,
      amenities,
      createdBy: req.user.id,
    });

    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a hotel
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    if (hotel.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this hotel" });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a hotel
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    if (hotel.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this hotel" });
    }

    await hotel.remove();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getHotels, getHotelById, createHotel, updateHotel, deleteHotel };
