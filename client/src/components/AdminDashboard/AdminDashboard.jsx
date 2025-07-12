import { useEffect, useState } from "react";
import { FaUserSecret, FaUserTie, FaPlus } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setIsDashboard } from "../../store/userAuthSlice";

const BookingCard = ({ hotelData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 60 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className=" md:my-2 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4 flex flex-col md:flex-row flex-wrap justify-between md:items-center hover:shadow-lg transition-shadow duration-300 md:w-[50%]"
    >
      {/* Hotel Info */}
      <div className="flex-1 pr-4">
        <h4 className="text-xl font-bold text-accent3">
          {hotelData.hotel_name}
        </h4>
        <p className="text-gray-500 flex items-center text-sm mt-1">
          <FaLocationDot className="mr-1" />
          {hotelData.address}
        </p>
      </div>

      {/* Admin actions */}
      <div className="flex md:flex-col gap-2 text-right mt-2 justify-end md:-4">
        <button className="hover:bg-blue-100 hover:text-blue-600 hover:scale-105 transition-all duration-150 font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <RxUpdate />
          Update
        </button>
        <button className="hover:bg-red-100 hover:text-red-600 hover:scale-105 transition-all duration-150 font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <MdDeleteForever />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsDashboard(true));
    if (!user?.name) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://event-booking-portal.onrender.com/api/admin/displayhotel`,
          // `http://localhost:5000/api/admin/displayhotel`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setBookingData(data.adminHotelList);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch booking data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
            {user?.role !== "admin" ? (
              <FaUserTie className="text-3xl" />
            ) : (
              <FaUserSecret className="text-3xl" />
            )}
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
              Admin is here! ({user.email})
            </p>
          </motion.div>
        </motion.div>
        <div className="flex justify-end items-center gap-3 my-3 text-semibold">
          <button className="flex items-center text-lg gap-1 bg-white hover:bg-accent3 hover:text-white rounded-3xl shadow-lg py-1 px-3 transition-all duration-150">
            <FaPlus />
            Offer
          </button>
          <button className="flex items-center text-lg gap-1 bg-white hover:bg-accent3 hover:text-white rounded-3xl shadow-lg py-1 px-3 transition-all duration-150">
            <FaPlus />
            Hotel
          </button>
        </div>
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
            Hotels to update
          </motion.h4>
          {loading ? (
            <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4">
              <p className="animate-pulse duration-75 transition-all text-center">
                Loading Data...
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 justify-evenly">
              {bookingData?.length === 0 && (
                <div className="text-xl text-center my-10 text-gray-500">
                  No hotels have been added yet. Use the admin panel to add
                  entries.
                </div>
              )}
              {bookingData?.length > 0 &&
                bookingData.map((booking) => (
                  <BookingCard key={booking._id} hotelData={booking} />
                ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;
