import { useEffect, useState } from "react";
import {
  FaUserSecret,
  FaUserTie,
  FaPlus,
  FaLocationDot,
} from "react-icons/fa6";
import { IoMdBookmarks } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setIsDashboard, setUser } from "../../store/userAuthSlice";
import HotelForm from "./HotelForm";
import OfferModal from "./OfferModal";

const BookingCard = ({ hotelData, onDelete, onEdit, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 60 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className="bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4 flex items-center gap-2 hover:shadow-lg transition-shadow duration-300 lg:w-[47%]"
    >
      <GiCrossedSabres
        className="hover:text-red-500 hover:scale-125 transition-all duration-100"
        onClick={() => onRemove(hotelData._id)}
      />
      <div className=" flex flex-col md:flex-row justify-between md:items-center border-l pl-2 w-full">
        <div className="flex flex-col justify-center pr-4">
          <h4 className="text-xl font-bold text-accent3">
            {hotelData.hotel_name}
          </h4>
          <p className="text-gray-500 flex items-center text-sm mt-1">
            <FaLocationDot className="mr-1" />
            {hotelData.address}
          </p>
        </div>
        <div className="flex md:flex-col gap-2 text-right mt-2 justify-end md:-4">
          <button
            onClick={() => onEdit(hotelData)}
            className="hover:bg-blue-100 hover:text-blue-600 hover:scale-105 transition-all duration-150 font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1"
          >
            <RxUpdate /> Update
          </button>
          <button
            onClick={() => onDelete(hotelData._id)}
            className="hover:bg-red-100 hover:text-red-600 hover:scale-105 transition-all duration-150 font-medium px-3 py-1 rounded-full shadow-md flex items-center gap-1"
          >
            <MdDeleteForever /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("default"); // default | addHotel | updateHotel
  const [editHotel, setEditHotel] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/admin/displayhotel`,
        // "http://localhost:5000/api/admin/displayhotel",
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

  const deleteHotel = async (hotelId) => {
    try {
      const res = await fetch(
        `https://event-booking-portal.onrender.com/api/hotels/delete/${hotelId}`,
        // `http://localhost:5000/api/hotels/delete/${hotelId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Hotel deleted successfully");
        fetchData();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    dispatch(setIsDashboard(true));
    if (!user?.name) navigate("/");
    fetchData();
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
    } catch (error) {
      console.log(error);
    }
    setBookingData((prev) => prev.filter((hotel) => hotel._id !== Id));
  };

  return (
    <div className="w-[90vw] mx-auto mt-6 md:mt-0 mb-8">
      {/* Back Button */}
      {window.innerWidth > 480 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="my-4 px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md transition-all duration-300"
          onClick={() => navigate("/")}
        >
          Back to Home
        </motion.button>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className="bg-white rounded-xl shadow-xl py-4 px-6 mb-6 flex items-center justify-between"
      >
        <div className="rounded-full bg-gradient-to-br from-accent1 to-accent2 text-white p-4 shadow-lg">
          {user?.role === "admin" ? (
            <FaUserSecret className="text-3xl" />
          ) : (
            <FaUserTie className="text-3xl" />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent1 to-accent2 text-transparent bg-clip-text text-right">
            Hello, {user.name}
          </h2>
          <p className="text-right text-gray-600">
            Admin is here! ({user.email})
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 mb-4">
        <button
          onClick={() => setShowOfferModal(true)}
          className="flex items-center text-lg gap-1 bg-white hover:bg-accent3 hover:text-white rounded-3xl shadow-lg py-1 px-3"
        >
          <FaPlus /> Offer
        </button>
        <button
          onClick={() => {
            setMode("addHotel");
            setEditHotel(null);
          }}
          className="flex items-center text-lg gap-1 bg-white hover:bg-accent3 hover:text-white rounded-3xl shadow-lg py-1 px-3"
        >
          <FaPlus /> Hotel
        </button>
      </div>

      {/* Conditional Views */}
      {mode === "addHotel" || mode === "updateHotel" ? (
        <HotelForm
          initialData={editHotel}
          onCancel={() => setMode("default")}
          onSuccess={() => {
            fetchData();
            setMode("default");
          }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, translateY: 60 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="bg-white rounded-xl shadow-xl py-3 px-6"
        >
          <h4 className="font-semibold text-lg text-gray-600 flex items-center gap-1 border-b pb-2">
            <IoMdBookmarks className="text-xl" /> Hotels to update
          </h4>

          {loading ? (
            <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl shadow-md p-4 text-center animate-pulse">
              Loading Data...
            </div>
          ) : (
            <div className="flex flex-col flex-wrap lg:flex-row gap-4 p-2 pt-4 justify-evenly">
              {bookingData.length === 0 ? (
                <p className="text-xl text-center text-gray-500">
                  No hotels added yet. Use the admin panel to add entries.
                </p>
              ) : (
                bookingData.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    hotelData={booking}
                    onEdit={(hotel) => {
                      setEditHotel(hotel);
                      setMode("updateHotel");
                    }}
                    onDelete={deleteHotel}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Offer Modal */}
      {showOfferModal && (
        <OfferModal
          onClose={() => setShowOfferModal(false)}
          onSuccess={() => {
            setShowOfferModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
