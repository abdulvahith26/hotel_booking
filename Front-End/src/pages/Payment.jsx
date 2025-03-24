import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId || "N/A";
  const baseAmount = location.state?.amount || 4000; // Default amount

  // Fees Calculation
  const tax = (18 / 100) * baseAmount;
  const platformFee = (1 / 100) * baseAmount;
  const discount = (25 / 100) * baseAmount;
  const totalAmount = baseAmount + tax + platformFee - discount;

  const [isSwiped, setIsSwiped] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    localStorage.removeItem("paymentSuccess");
    localStorage.removeItem("paymentId");
    setPaymentSuccess(false);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payment/order",
        { amount: totalAmount, currency: "INR" }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Hotel Booking",
        description: "Reservation Payment",
        order_id: order.id,
        theme: { color: "#007BFF" },
        handler: async function (response) {
          setPaymentId(response.razorpay_payment_id);
          setPaymentSuccess(true);
          localStorage.setItem("paymentSuccess", "true");
          localStorage.setItem("paymentId", response.razorpay_payment_id);
          toast.success("Payment successful! Booking confirmed.");
        },
        payment_capture: 1,
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          paylater: true,
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      toast.error("Payment failed! Please try again.");
    }
  };

  const handleSwipe = () => {
    if (!isSwiped) {
      setIsSwiped(true);
      setTimeout(() => {
        handlePayment();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[450px] text-center">
        {paymentSuccess ? (
          <>
            <h1 className="text-2xl font-semibold text-green-400">
              ✅ Payment Successful!
            </h1>

            {/* Success Image */}
            {/* <img
              src="/success-image.png" // Change this to your success image path
              alt="Success"
              className="w-32 mx-auto my-4"
            /> */}

            <div className="bg-gray-700 p-4 mt-4 rounded-lg text-left">
              <p>
                <span className="font-semibold text-gray-300">Booking ID:</span>{" "}
                <span className="text-yellow-300  ">{bookingId}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-300">Payment ID:</span>{" "}
                <span className="text-blue-400">{paymentId}</span>
              </p>
            </div>

            <p className="mt-4 text-sm text-yellow-400">
              📸 Please take a screenshot for check-in.
            </p>

            {/* Buttons shown ONLY after payment success */}
            <div className="mt-6 flex justify-between w-full">
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition w-"
              >
                Home
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                   window.location.reload();
                  navigate("/login");
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition w- "
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white">
              Complete Your Payment
            </h1>
            <p className="text-gray-400 text-sm mb-4">Booking ID: {bookingId}</p>

            <div className="border-t border-gray-700 my-4"></div>

            <div className="text-sm space-y-2 text-left">
              <p className="flex justify-between">
                <span className="text-gray-300">Base Amount:</span>
                <span className="text-gray-300">₹{baseAmount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-300">Tax (18%):</span>
                <span className="text-gray-300">₹{tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-300">Platform Fee (1%):</span>
                <span className="text-gray-300">₹{platformFee.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-green-400">Discount (25%):</span>
                <span className="text-green-400">-₹{discount.toFixed(2)}</span>
              </p>
            </div>

            <div className="mt-4 text-lg font-semibold text-white flex justify-between">
              <span>Total:</span>
              <span className="text-yellow-400">₹{totalAmount.toFixed(2)}</span>
            </div>

            {/* Swipe to Pay Button */}
            <div
              className="relative w-[300px] h-[50px] bg-blue-500 rounded-full flex items-center px-4 mt-6 overflow-hidden cursor-pointer shadow-lg"
              onClick={handleSwipe}
            >
              <div
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-[42px] h-[42px] bg-white rounded-full flex items-center justify-center text-blue-500 text-lg font-semibold transition-all duration-500 ${
                  isSwiped ? "translate-x-[250px]" : "translate-x-0"
                }`}
              >
                {">"}
              </div>
              <p className="ml-[55px] text-white text-md font-medium">
                Slide to Pay  | ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
