import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHotel, FaUtensils, FaSpa } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";

const Home = () => {
  return (
    <div
      className="relative w-full min-h-screen text-white flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://c.wallhere.com/photos/06/e9/city_las_vegas_hotel_venice_bridge_beautiful_bright_night-1059987.jpg!d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Blurred Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"></div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full px-6">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg font-serif text-shadow">
            Welcome to Luxury Stay
          </h1>
          <p className="text-lg mt-3 opacity-80 font-light">
            Experience comfort like never before
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex space-x-6 mt-8"
        >
          <Link
            to="/hotel"
            className="flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-md transition-all duration-300 
            bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg backdrop-blur-md 
            hover:scale-105 hover:shadow-2xl hover:from-yellow-400 hover:to-orange-400 hover:glow-effect"
          >
            <MdTravelExplore size={22} />
            Explore
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 
            bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg backdrop-blur-md 
            hover:scale-105 hover:shadow-2xl hover:from-blue-400 hover:to-blue-600 hover:glow-effect"
          >
            <FiLogIn size={22} />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 
            bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg backdrop-blur-md 
            hover:scale-105 hover:shadow-2xl hover:from-purple-400 hover:to-purple-600 hover:glow-effect"
          >
            <FaUserPlus size={22} />
            Register
          </Link>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full text-center pb-12 mt-24"
        >
          <h2 className="text-3xl font-bold mb-4 font-serif text-shadow">
            Services
          </h2>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {[
              {
                title: "Luxury Rooms",
                desc: "Top-notch luxury experiences.",
                icon: <FaHotel size={28} className="text-yellow-400" />,
              },
              {
                title: "Fine Dining",
                desc: "World-class cuisine from top chefs.",
                icon: <FaUtensils size={28} className="text-red-400" />,
              },
              {
                title: "Spa & Wellness",
                desc: "Rejuvenate with premium spa treatments.",
                icon: <FaSpa size={28} className="text-blue-400" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl text-sm w-64 text-center service-card"
              >
                <div className="flex justify-center mb-3">{service.icon}</div>
                <h3 className="text-md font-semibold mb-2">{service.title}</h3>
                <p className="opacity-80 text-xs font-light">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
