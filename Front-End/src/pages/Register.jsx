import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("🚨 Passwords do not match!", {
        style: { background: "#ff4d4d", color: "#fff" },
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("🎉 Registration successful! Redirecting...", {
          style: { background: "#4CAF50", color: "#fff" },
        });

        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration failed. Try again.", {
        style: { background: "#ff4d4d", color: "#fff" },
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl px-10 py-8 max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white focus:ring-2 focus:ring-purple-500 border-none outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white focus:ring-2 focus:ring-purple-500 border-none outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white focus:ring-2 focus:ring-purple-500 border-none outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white focus:ring-2 focus:ring-purple-500 border-none outline-none"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 mt-4 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-400 hover:to-purple-600 transition-all"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-950 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
