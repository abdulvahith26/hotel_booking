import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
// import Hotels from "./pages/Hotels";
// import Booking from "./pages/Booking";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Hotel from "./pages/Hotel"
import {Toaster} from "react-hot-toast"
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";

function App() {
  return (
    <AuthProvider>
      
          <Toaster position="top-right" reverseOrder={false} />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hotel" element={<Hotel/>}/>
      <Route path="/booking/:id" element={<Booking/>} />
      <Route path="/payment" element={<Payment />} />

    </Routes>
    
    </AuthProvider>
  );
}

export default App;
