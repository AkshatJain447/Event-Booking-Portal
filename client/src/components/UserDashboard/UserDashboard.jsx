import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setIsDashboard, setUser } from "../../store/userAuthSlice";
import { setIsEvent } from "../../store/eventSlice";
import Event from "./Event";

const BookingCard = ({ user, handleRemove }) => {
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const promises = user.bookings.map((booking) =>
          fetch(
            `https://event-booking-portal.onrender.com/api/users/findhotel/${booking.hotelId}`
            // `http://localhost:5000/api/users/findhotel/${booking.hotelId}`
          ).then((res) => res.json())
        );

        const results = await Promise.all(promises);

        const hotelMap = {};
        results.forEach((res, index) => {
          const hotelId = user.bookings[index].hotelId;
          hotelMap[hotelId] = res.hotelData;
        });

        setBookingData(hotelMap);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch booking data");
      } finally {
        setLoading(false);
      }
    };

    if (user.bookings?.length > 0) {
      fetchAllBookings();
    } else {
      setLoading(false);
    }
  }, [user.bookings]);

  if (loading) {
    return (
      <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4">
        <p className="animate-pulse duration-75 transition-all text-center">
          Fetching User Bookings...
        </p>
      </div>
    );
  }

  if (!user.bookings || user.bookings.length === 0) {
    return (
      <div className="text-xl text-center my-10 text-gray-500">
        You haven’t booked anything yet. Start planning your perfect event
        today!
      </div>
    );
  }

  return (
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

      {user.bookings.map((booking) => {
        const hotel = bookingData[booking.hotelId];
        if (!hotel) return null;

        const totalAmount = booking.duration * (hotel?.room?.gross_price || 0);

        return (
          <motion.div
            key={booking.hotelId}
            initial={{ opacity: 0, translateX: 60 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="my-4 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4 flex flex-col md:flex-row flex-wrap justify-evenly md:items-center hover:shadow-lg transition-shadow duration-300"
          >
            {/* Hotel Info */}
            <div className="flex-1 pr-4">
              <h4 className="text-xl font-bold text-accent3">
                {hotel?.hotel_name}
              </h4>
              <p className="text-gray-500 flex items-center text-sm mt-1">
                <FaLocationDot className="mr-1" />
                {hotel?.address}
              </p>
            </div>

            {/* Booking Details */}
            <div className="flex-1 text-sm text-gray-600 md:ml-6">
              <p>
                <span className="font-semibold">Type:</span> Room
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {booking.duration} days
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹{totalAmount}
              </p>
            </div>

            {/* Status + Action */}
            <div className="mt-2 md:mt-0 flex md:flex-col justify-between gap-2">
              <span className="inline-block bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-center">
                ✅ Booked
              </span>
              <button
                className="hover:text-red-500 transition-all duration-100 text-gray-600 shadow-md hover:bg-red-100 font-medium px-3 py-1 rounded-full border"
                onClick={() => handleRemove(booking.hotelId)}
              >
                Cancel Booking
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const isEvent = useSelector((state) => state.event.isEvent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsDashboard(true));
    if (!user?.name) {
      navigate("/");
    }
    return () => dispatch(setIsDashboard(false));
  }, []);

  const handleRemove = async (Id) => {
    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/users/removehotel/${Id}`,
        // `http://localhost:5000/api/users/removehotel/${Id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setUser(data.user));
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/userdashboard");
    }
  };

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
        <div
          className="mb-3 mr-1 flex items-center gap-1 justify-end text-gray-600 hover:text-black cursor-pointer"
          onClick={() => {
            dispatch(setIsEvent(!isEvent));
          }}
        >
          <input type="checkbox" id="isEvent" checked={isEvent} />
          <p className="w-3/4 text-right md:w-auto">
            {user.event
              ? "You already have an event – View or manage it?"
              : "Planning an event? Check this box to get started"}
          </p>
        </div>

        {user.event && isEvent ? (
          <Event />
        ) : (
          <BookingCard user={user} handleRemove={handleRemove} />
        )}
      </div>
    </>
  );
};

export default UserDashboard;
