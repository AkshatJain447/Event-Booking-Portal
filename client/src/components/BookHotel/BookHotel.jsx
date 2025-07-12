import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MagnifyingGlass } from "react-loader-spinner";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaDoorOpen,
  FaBed,
  FaBath,
  FaWifi,
  FaRegThumbsUp,
  FaConciergeBell,
  FaRestroom,
  FaRegSnowflake,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FcClock } from "react-icons/fc";
import {
  GiMicrophone,
  GiForkKnifeSpoon,
  GiEmptyHourglass,
  GiSofa,
} from "react-icons/gi";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdBalcony } from "react-icons/md";
import room from "../../assets/Room.jpg";
import hall from "../../assets/hall.jpg";
import { useSelector } from "react-redux";

const Loader = () => {
  return (
    <motion.p
      className="my-8 flex flex-wrap justify-center items-center text-4xl font-bold"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "backIn",
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      Fetching <span className="text-accent3 mx-1">Hotel</span> Data for You
    </motion.p>
  );
};

// Booking modal
const BookingModal = ({ hotel, type, onClose }) => {
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (duration < 1) {
      toast.error("Duration must be at least 1 day");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://event-booking-portal.onrender.com/api/users/bookhotel",
        // "http://localhost:5000/api/users/bookhotel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            hotelId: hotel._id,
            duration: Number(duration),
            type: type === "room" ? "Room" : "Hall",
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Booking confirmed!");
        onClose();
      } else {
        toast.error(data.message || "Failed to book.");
      }
    } catch (error) {
      toast.error("Error while booking. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const price =
    type === "room"
      ? hotel.room.gross_price * duration
      : hotel.hall.gross_price * duration;

  return (
    <div className="bg-white shadow-xl rounded-xl p-5 max-w-md mx-auto">
      <div className="mb-3">
        <h2 className="text-xl font-bold mb-1">{hotel.hotel_name}</h2>
        <p className="text-sm text-gray-600">{hotel.address}</p>
      </div>

      <div className="border-t pt-3 text-gray-600 mb-1">
        <h4 className="font-semibold flex items-center gap-2">
          {type === "room" ? <FaBed /> : "🏢"}{" "}
          {type === "room" ? "Room" : "Event Hall"} Details
        </h4>
        <div className="border rounded-lg px-2">
          <div className="flex flex-row justify-between">
            <p className="flex flex-row gap-1 items-center">
              <GiSofa /> Type: {hotel[type].type}
            </p>
            <p className="flex items-center gap-1">
              <IoPeople /> Capacity: {hotel[type].capacity}
            </p>
          </div>
          <p>
            Price: ₹{hotel[type].gross_price} /{" "}
            {type === "room" ? "night" : "day"}
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="duration"
          className="text-sm font-medium text-gray-700 mr-2"
        >
          Duration ({type === "room" ? "nights" : "days"}):
        </label>
        <input
          type="number"
          id="duration"
          min={1}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          max={10}
          className=" border border-gray-300 px-3 py-1 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-row justify-between text-lg font-semibold mb-3 mt-2 border-t pt-2">
        Total Price: <span>₹ {price}</span>
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 border border-gray-400 rounded hover:bg-red-600 hover:text-white transition-all duration-150 shadow-md"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 border border-gray-400 hover:text-white rounded hover:bg-blue-700 disabled:opacity-60 shadow-md"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

const HotelContent = ({ hotel }) => {
  const storeSearchQuery = useSelector((state) => state.hotels.searchQuery);
  const [showModal, setShowModal] = useState(false);
  const [bookingType, setBookingType] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <div className="w-[95vw] mb-4 mt-3 md:mb-6 lg:mb-8 mx-auto">
      {/* Hotel Header */}
      <motion.div
        className="bg-white rounded-xl shadow-xl"
        initial={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 items-center">
          <img
            src={hotel.max_photo_url}
            alt="Hotel Image"
            className="lg:col-span-2 lg:rounded-l-xl h-[250px] md:h-[400px] xl:h-[440px] w-full"
            loading="lazy"
          />
          <div className="lg:border-l p-2 md:px-4 lg:pr-2 lg:pl-4 lg:my-3">
            <h2 className="text-3xl font-bold text-accent3 flex items-center gap-2">
              <FaDoorOpen className="text-7xl" /> {hotel.hotel_name}
            </h2>
            <p className="flex items-center text-gray-600 gap-2">
              <FaMapMarkerAlt /> {hotel.address}
            </p>
            <p className="text-sm text-gray-500">
              📍 Coordinates: {hotel.latitude}, {hotel.longitude}
            </p>
            <div className="text-lg mt-4">
              <p className="flex items-center gap-2 mb-1">
                <FaStar className="text-yellow-400" />
                <strong>Hotel Category:</strong> {hotel.class} Star
              </p>
              <p className="flex items-center gap-2">
                <FaRegThumbsUp />
                <strong>Rating:</strong>{" "}
                <span
                  className={`rounded-md px-2 text-white font-semibold ${
                    hotel.review_score > 7 ? "bg-green-600" : "bg-orange-400"
                  }`}
                >
                  {hotel.review_score}
                </span>
                <span
                  className={`font-semibold ${
                    hotel.review_score > 7
                      ? "text-green-600"
                      : "text-orange-400"
                  }`}
                >
                  {hotel.review_score_word}
                </span>
                |{" "}
                <span className="text-gray-500 italic text-sm">
                  ({hotel.review_nr} reviews)
                </span>
              </p>
            </div>

            {/* Check-In / Check-Out */}
            <div className="text-lg my-2">
              <p className="flex items-center gap-2 mb-1">
                <FcClock />
                <strong>Check-in:</strong> {hotel.checkin.from} –{" "}
                {hotel.checkin.until}
              </p>
              <p className="flex items-center gap-2 mb-1">
                <FcClock />
                <strong>Check-out:</strong> {hotel.checkout.from} –{" "}
                {hotel.checkout.until}
              </p>
              <p className="flex items-center gap-2 mb-1">
                <GiEmptyHourglass />
                <strong>Duration:</strong> {storeSearchQuery.duration} days
              </p>
            </div>

            {/* Policy Badges */}
            <div className="flex flex-wrap mt-1">
              {hotel.is_free_cancellable && (
                <p className="px-3 py-[2px] mr-2 mb-2 rounded-full bg-purple-200 text-purple-600">
                  Free Cancellable
                </p>
              )}
              {hotel.is_no_prepayment_block && (
                <p className="px-3 py-[2px] mr-2 mb-2 rounded-full bg-green-200 text-green-600">
                  No Prepayment
                </p>
              )}
              {hotel.cc_required && (
                <p className="px-3 py-[2px] mr-2 mb-2 rounded-full bg-red-200 text-red-600">
                  Credit Card Required
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Amenities */}
      <motion.div
        className="bg-white rounded-xl shadow-xl my-6 p-2"
        initial={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <h4 className="text-lg text-gray-600 font-semibold mb-1 flex items-center gap-2 ml-2">
          <FaConciergeBell className="text-accent3" /> Available Amenities
        </h4>
        <ul className="flex gap-3 flex-wrap">
          {hotel.amenities.map((amenity) => (
            <li
              key={amenity}
              className="text-lg border border-gray-200 hover:border-accent3 hover:text-accent3 font-semibold rounded-3xl px-4 py-1 shadow-md cursor-pointer transition-all duration-150"
            >
              {amenity}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
        {/* Room Section */}
        <motion.div
          className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-2 w-fit"
          initial={{ opacity: 0, translateX: 60 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <img
            src={room}
            alt="Room Image"
            className="h-[280px] md:rounded-l-xl"
            loading="lazy"
          />
          <div className="border-l px-2 pr-4">
            <h4 className="text-lg font-bold mb-1 mx-1 flex items-center gap-2 text-accent3">
              <FaBed /> Room Details
            </h4>
            <div className="flex items-center gap-3">
              <p>
                🛋️ <strong>Type:</strong> {hotel.room.type}
              </p>
              <p className="flex items-center gap-1">
                <IoPeople /> <strong>Capacity:</strong> {hotel.room.capacity}{" "}
              </p>
            </div>
            <p className="mt-1 font-medium">📋 Included Services:</p>
            <ul className="ml-6 list-disc text-gray-600 text-sm">
              <li>
                <FaBed className="inline" /> Premium Queen-sized Bed
              </li>
              <li>
                <FaBath className="inline" /> Ensuite Bathroom
              </li>
              <li>
                <MdBalcony className="inline" /> Private Balcony View
              </li>
              <li>
                <FaConciergeBell className="inline" /> 24/7 Room Service
              </li>
              <li>
                <FaWifi className="inline" /> High-Speed Wi-Fi
              </li>
            </ul>
            <p className="mt-2 text-right">
              <strong>Price:</strong> ₹
              {Math.ceil(
                hotel.room.gross_price *
                  storeSearchQuery.rooms *
                  storeSearchQuery.duration
              )}{" "}
              <span className="line-through text-gray-500 text-sm italic">
                ₹
                {Math.ceil(
                  hotel.room.all_inclusive_price *
                    storeSearchQuery.rooms *
                    storeSearchQuery.duration
                )}
              </span>
            </p>
            <button
              className="mt-1 mb-2 md:mb-0  bg-blue-500 text-white py-1 px-4 rounded float-right hover:bg-blue-600 hover:scale-105 transition-all duration-150 shadow-md"
              onClick={() => {
                setShowModal(true);
                setBookingType("room"); // or "hall"
              }}
            >
              Book This Room
            </button>
          </div>
        </motion.div>

        {/* Hall Section */}
        {hotel.hall && (
          <motion.div
            className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-2 w-fit"
            initial={{ opacity: 0, translateX: 60 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <img
              src={hall}
              alt="Hall image"
              className="h-[280px] md:rounded-l-xl"
              loading="lazy"
            />
            <div className="border-l px-2 pr-4">
              <h4 className="text-lg font-bold mb-1 mx-1 flex items-center gap-2 text-accent3">
                🏢 Event Hall Details
              </h4>
              <div className="flex items-center gap-3">
                <p>
                  🏷️<strong>Type:</strong> {hotel.hall.type}
                </p>
                <p>
                  <IoPeople className="inline" /> <strong>Capacity:</strong>{" "}
                  {hotel.hall.capacity}
                </p>
              </div>
              <p className="mt-2 font-medium">📋 Included Facilities:</p>
              <ul className="ml-6 list-disc text-gray-600 text-sm">
                <li>
                  <FaRegSnowflake className="inline" /> Fully Air-Conditioned
                </li>
                <li>
                  <FaRestroom className="inline" /> Attached Restroom
                </li>
                <li>
                  <GiMicrophone className="inline" /> Stage & Podium Setup
                </li>
                <li>
                  <GiForkKnifeSpoon className="inline" /> Catering Assistance
                </li>
                <li>
                  <HiWrenchScrewdriver className="inline" /> 24/7 Maintenance
                  Staff
                </li>
              </ul>
              <p className="mt-2 text-right">
                <strong>Price:</strong> ₹
                {Math.ceil(
                  hotel.hall.gross_price *
                    storeSearchQuery.halls *
                    storeSearchQuery.duration
                )}{" "}
                <span className="line-through text-gray-500 text-sm italic">
                  ₹
                  {Math.ceil(
                    hotel.hall.all_inclusive_price *
                      storeSearchQuery.halls *
                      storeSearchQuery.duration
                  )}
                </span>
              </p>
              <button
                className="mt-1 mb-2 md:mb-0 bg-purple-500 text-white py-1 px-4 rounded float-right hover:bg-purple-600 hover:scale-105 transition-all duration-150 shadow-md"
                onClick={() => {
                  setShowModal(true);
                  setBookingType("hall");
                }}
              >
                Book This Hall
              </button>
            </div>
          </motion.div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <BookingModal
            hotel={hotel}
            type={bookingType}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </div>
  );
};

const BookHotel = () => {
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(
          `https://event-booking-portal.onrender.com/api/hotels/id/${id}`
          // `http://localhost:5000/api/hotels/id/${id}`
        );
        const data = await response.json();
        setHotelData(data.hotel);
      } catch (error) {
        toast.error("Error is Fetching hotel");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {window.innerWidth > 480 && (
        <div className="mt-3 w-[95vw] mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md transition-all duration-300 mr-3"
            onClick={() => navigate("/search")}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Home
          </motion.button>
        </div>
      )}
      <HotelContent hotel={hotelData} />
    </>
  );
};

export default BookHotel;
