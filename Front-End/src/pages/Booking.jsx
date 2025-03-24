import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShuttleVan, FaConciergeBell, FaSmokingBan, FaWheelchair, FaParking, FaWifi, FaUsers, FaClock, FaUtensils } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const pricePerNight = 2000;

  // Calculate total price whenever check-in or check-out date changes
  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      const checkInDate = new Date(dates.checkIn);
      const checkOutDate = new Date(dates.checkOut);
      const nights = Math.max(1, (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      if (checkOutDate <= checkInDate) {
        toast.error("Check-out date must be after check-in date.");
        setTotalPrice(0);
        return;
      }

      setTotalPrice(nights * pricePerNight);
    }
  }, [dates]);

  // Fetch hotel details
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  // Handle booking
  const handleBooking = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("User not authenticated. Please log in.");
      return;
    }
  
    if (!dates.checkIn || !dates.checkOut) {
      toast.error("Please select valid check-in and check-out dates.");
      return;
    }
  
    if (!totalPrice || totalPrice <= 0) {
      toast.error("Invalid amount. Please select valid dates.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/booking",
        {
          hotelId: id,
          checkInDate: dates.checkIn,
          checkOutDate: dates.checkOut,
          totalPrice: totalPrice || pricePerNight, 
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const bookingId = response.data._id;
      toast.success("Booking successful! Proceeding to payment...");
  
      setTimeout(() => {
        navigate("/payment", { state: { bookingId, amount: totalPrice || pricePerNight } }); 
      }, 2000);
    } catch (err) {
      console.error("Booking Error:", err);
      toast.error("Booking failed. Please try again.");
    }
  };
  

  if (loading) {
    return <div className="text-center  mt-52 text-green-600">Loading...</div>;
  }

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hotel Details */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-green-600">{hotel?.name}</h1>
        <p className="text-gray-600">{hotel?.location}</p>
        <p className="text-gray-700">{hotel?.description}</p>
      </div>

      {/* Image Gallery */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hotel?.images?.slice(0, 4).map((img, index) => (
          <img key={index} src={img} alt={`Hotel ${index + 1}`} className="w-full h-40 rounded-md object-cover" />
        ))}
      </motion.div>

      {/* Facilities Section */}
      <motion.div
        className="text-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-3 text-green-600">Most popular facilities</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center"><FaShuttleVan className="text-green-600 mr-2" /> Airport shuttle</div>
          <div className="flex items-center"><FaConciergeBell className="text-green-600 mr-2" /> Room service</div>
          <div className="flex items-center"><FaSmokingBan className="text-green-600 mr-2" /> Non-smoking</div>
          <div className="flex items-center"><FaWheelchair className="text-green-600 mr-2" /> Accessible</div>
          <div className="flex items-center"><FaParking className="text-green-600 mr-2" /> Free parking</div>
          <div className="flex items-center"><FaWifi className="text-green-600 mr-2" /> Free WiFi</div>
          <div className="flex items-center"><FaUsers className="text-green-600 mr-2" /> Family rooms</div>
          <div className="flex items-center"><FaClock className="text-green-600 mr-2" /> 24-hour front desk</div>
          <div className="flex items-center"><FaUtensils className="text-green-600 mr-2" /> Breakfast</div>
        </div>
      </motion.div>

      {/* Booking Section */}
      {/* Booking Section */}
<motion.div
  className="bg-white p-6 shadow-lg rounded-lg border border-green-500"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="text-xl font-bold mb-4 text-green-700">Book Your Stay</h2>

  {/* Check-in & Check-out in the same row */}
  <div className="flex gap-4">
    {/* Check-in Date */}
    <div className="w-1/2">
      <label className="block text-gray-700 font-semibold text-sm mb-1">Check-in</label>
      <input
        type="date"
        onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
        className="border p-3 w-full rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Check-out Date */}
    <div className="w-1/2">
      <label className="block text-gray-700 font-semibold text-sm mb-1">Check-out</label>
      <input
        type="date"
        onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
        className="border border-green-500 p-3 w-full rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  </div>

  {/* Confirm Booking Button with Total Price inside */}
  <motion.button
    onClick={handleBooking}
    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full text-sm font-semibold transition-all flex justify-center items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Confirm Booking - <span className="ml-2 text-yellow-300 font-bold">₹{totalPrice}</span>
  </motion.button>
</motion.div>

    </motion.div>
  );
};

export default Booking;
