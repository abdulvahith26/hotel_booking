import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar, FaSpinner, FaRegCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://hotel-booking-w6im.onrender.com/api/hotels");
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) return <LoadingSkeleton />; // Show skeleton loader
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

// ✅ **Skeleton Loader for Better UX**
const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse flex flex-col md:flex-row bg-gray-400 shadow-lg rounded-lg overflow-hidden border border-gray-500 w-full max-w-2xl mx-auto p-4">
          <div className="w-full md:w-2/5 h-40 bg-gray-500 rounded-md"></div>
          <div className="w-full md:w-3/5 p-3 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const HotelCard = ({ hotel }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const navigate = useNavigate();
  const placeholderImg = "https://via.placeholder.com/300x180?text=No+Image";

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-gray-300 shadow-lg rounded-lg overflow-hidden border border-gray-400 w-full max-w-2xl mx-auto transition-transform transform hover:scale-105"
    >
      {/* ✅ Smooth Image Transitions */}
      <div className="relative w-full md:w-2/5 h-40 md:h-44">
        <motion.img
          key={currentImgIndex}
          src={hotel.images.length > 0 ? hotel.images[currentImgIndex] : placeholderImg}
          alt={hotel.name}
          className="w-full h-full object-cover rounded-l-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        {hotel.images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full shadow-md"
              onClick={prevImage}
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full shadow-md"
              onClick={nextImage}
            >
              <FaArrowRight size={14} />
            </button>
            <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
              {currentImgIndex + 1} / {hotel.images.length}
            </div>
          </>
        )}
      </div>

      {/* Right: Hotel Details */}
      <div className="w-full md:w-3/5 p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold text-gray-900">{hotel.name}</h3>
          <div className="flex items-center text-yellow-500 mt-1 text-sm">
            <FaStar className="mr-1" />
            <span className="font-bold">{hotel.rating}</span>
            <span className="text-gray-500 ml-2">({hotel.reviews} reviews)</span>
          </div>
          <p className="text-xs text-gray-700 mt-1">{hotel.description}</p>
          <p className="text-xs text-gray-500 mt-1">{hotel.distance} km to City Center</p>
        </div>

        {/* ✅ Price & Book Now Button with Icon */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-md font-bold text-green-700">₹{hotel.price}</p>
          <motion.button
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/booking/${hotel._id}`)}
          >
            <FaRegCreditCard /> Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hotel;
