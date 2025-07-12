import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setIsDashboard } from "../../store/userAuthSlice";

const BookingCard = ({ hotelData }) => {
  const [bookingData, setBookingData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://event-booking-portal.onrender.com/api/users/findhotel/${hotelData.hotelId}`
          // `http://localhost:5000/api/users/findhotel/${hotelData.hotelId}`
        );
        const data = await response.json();
        setBookingData(data.hotelData);
      } catch (error) {
        toast.error("Failed to fetch booking data");
      }
    };
    fetchData();
  }, []);

  const totalAmount =
    hotelData.type === "room"
      ? hotelData.duration * bookingData.room?.gross_price
      : hotelData.duration * bookingData.hall?.gross_price;

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 60 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className="my-4 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4 flex flex-col md:flex-row flex-wrap justify-evenly md:items-center hover:shadow-lg transition-shadow duration-300"
    >
      {/* Hotel Info */}
      <div className="flex-1 pr-4">
        <h4 className="text-xl font-bold text-accent3">
          {bookingData.hotel_name}
        </h4>
        <p className="text-gray-500 flex items-center text-sm mt-1">
          <FaLocationDot className="mr-1" />
          {bookingData.address}
        </p>
      </div>

      {/* Booking Details */}
      <div className="flex-1 text-sm text-gray-600 md:ml-6">
        <p>
          <span className="font-semibold">Type:</span> {hotelData.type}
        </p>
        <p>
          <span className="font-semibold">Duration:</span> {hotelData.duration}{" "}
          days
        </p>
        <p className="">
          <span className="font-semibold">Amount:</span> ₹
          {totalAmount.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Status Badge */}
      <div className="text-right md:-4">
        <span className="inline-block bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full">
          ✅ Booked
        </span>
      </div>
    </motion.div>
  );
};

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsDashboard(true));
    return () => dispatch(setIsDashboard(false));
  }, []);

  return (
    <>
      {window.innerWidth > 480 && (
        <div className=" my-4 w-[90vw] mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Back to Home
          </motion.button>
        </div>
      )}
      <div className="w-[90vw] mx-auto mt-6 md:mt-0 mb-8">
        <motion.div
          initial={{ opacity: 0, translateY: 60 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="bg-white rounded-xl shadow-xl py-4 px-6 mb-6 flex items-center justify-between"
        >
          <div className="rounded-full bg-gradient-to-br from-accent1 to-accent2 text-white p-4 shadow-lg hover:scale-105 transform transition duration-300">
            <FaUserTie className="text-3xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, translateX: 60 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent1 to-accent2 text-transparent bg-clip-text text-right">
              Hello, {user.name}
            </h2>
            <p className="text-right text-gray-600">
              We're glad to have you back! ({user.email})
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: 60 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="bg-white rounded-xl shadow-xl py-3 px-6"
        >
          <motion.h4
            initial={{ opacity: 0, translateX: 60 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="font-semibold text-lg text-gray-600 flex items-center gap-1 border-b pb-2"
          >
            <IoMdBookmarks className="text-xl" />
            Your Booked Stays
          </motion.h4>
          <div>
            {user.bookings?.length === 0 && (
              <div className="text-xl text-center my-10 text-gray-500">
                You haven’t booked anything yet. Start planning your perfect
                event today!
              </div>
            )}
            {Array.isArray(user?.bookings) &&
              user.bookings.map((booking) => (
                <BookingCard key={booking._id} hotelData={booking} />
              ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UserDashboard;
