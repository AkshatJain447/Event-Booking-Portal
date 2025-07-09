import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "react-icons/fa";

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

const HotelContent = ({ hotel }) => {
  return (
    <>
      {/* Hotel Header */}
      <div>
        <img src={hotel.max_photo_url} alt="Hotel Image" />
        <div>
          <h2 className="text-2xl font-bold text-accent3 flex items-center gap-2">
            <FaDoorOpen /> {hotel.hotel_name}
          </h2>
          <p className="flex items-center text-gray-600 gap-1">
            <FaMapMarkerAlt /> {hotel.address}
          </p>
          <p className="text-sm text-gray-500">
            📍 Coordinates: {hotel.latitude}, {hotel.longitude}
          </p>
          <div>
            <p>
              <FaStar className="inline text-yellow-400" />{" "}
              <strong>Hotel Category:</strong> {hotel.class} Star
            </p>
            <p>
              🗣️ ({hotel.review_nr} reviews) | <strong>Rating:</strong>{" "}
              <span>{hotel.review_score}</span> – {hotel.review_score_word}
            </p>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-1">🛎️ Available Amenities</h4>
        <ul className="list-disc ml-6 text-gray-600">
          {hotel.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
      </div>

      {/* Policy Badges */}
      <div className="flex flex-wrap ml-1 mt-[6px] text-xs">
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

      {/* Check-In / Check-Out */}
      <div className="my-4">
        <p>
          🕑 <strong>Check-in:</strong> {hotel.checkin.from} –{" "}
          {hotel.checkin.until}
        </p>
        <p>
          🕓 <strong>Check-out:</strong> {hotel.checkout.from} –{" "}
          {hotel.checkout.until}
        </p>
      </div>

      {/* Room Section */}
      <div className="mt-6">
        <h4 className="text-lg font-bold mb-2">🛏️ Room Details</h4>
        <p>
          🛋️ <strong>Type:</strong> {hotel.room.type}
        </p>
        <p>
          <FaBed className="inline" /> <strong>Capacity:</strong>{" "}
          {hotel.room.capacity} guests
        </p>
        <p className="mt-2 font-medium">📋 Included Services:</p>
        <ul className="ml-6 list-disc text-gray-600">
          <li>
            <FaBed className="inline" /> Premium Queen-sized Bed
          </li>
          <li>
            <FaBath className="inline" /> Ensuite Bathroom
          </li>
          <li>🌇 Private Balcony View</li>
          <li>🛎️ 24/7 Room Service</li>
          <li>
            <FaWifi className="inline" /> High-Speed Wi-Fi
          </li>
        </ul>
        <p className="mt-2">
          💰 <strong>Price:</strong> ₹{hotel.room.gross_price}{" "}
          <span className="line-through text-gray-500 text-sm ml-2">
            ₹{hotel.room.all_inclusive_price}
          </span>
        </p>
        <button className="mt-3 bg-blue-500 text-white py-1 px-4 rounded">
          Book This Room
        </button>
      </div>

      {/* Hall Section */}
      <div className="mt-8">
        <h4 className="text-lg font-bold mb-2">🏢 Event Hall Details</h4>
        <p>
          🏷️ <strong>Type:</strong> {hotel.hall.type}
        </p>
        <p>
          🧍‍♂️ <strong>Capacity:</strong> {hotel.hall.capacity} guests
        </p>
        <p className="mt-2 font-medium">📋 Included Facilities:</p>
        <ul className="ml-6 list-disc text-gray-600">
          <li>❄️ Fully Air-Conditioned</li>
          <li>🚻 Attached Restroom</li>
          <li>🎤 Stage & Podium Setup</li>
          <li>🍽️ Catering Assistance</li>
          <li>👨‍🔧 24/7 Maintenance Staff</li>
        </ul>
        <p className="mt-2">
          💰 <strong>Price:</strong> ₹{hotel.hall.gross_price}{" "}
          <span className="line-through text-gray-500 text-sm ml-2">
            ₹{hotel.hall.all_inclusive_price}
          </span>
        </p>
        <button className="mt-3 bg-purple-600 text-white py-1 px-4 rounded">
          Book This Hall
        </button>
      </div>
    </>
  );
};

const BookHotel = () => {
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/hotels/id/${id}`
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

  return loading ? <Loader /> : <HotelContent hotel={hotelData} />;
};

export default BookHotel;
