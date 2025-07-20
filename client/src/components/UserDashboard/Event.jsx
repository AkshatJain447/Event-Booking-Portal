import { useEffect, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatererVendor,
  setDate,
  setDecoratorVendor,
  setDJVendor,
  setDuration,
  setHallHotel,
  setName,
  setRoomHotel,
  setTotalPrice,
} from "../../store/eventSlice";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { GiChanterelles, GiTheaterCurtains } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { caterers, decorators, djs } from "./data";
import VendorCard from "./VendorCard";
import roomImg from "../../assets/Room.jpg";
import hallImg from "../../assets/hall.jpg";

const HotelCard = ({ hotelObj, type }) => {
  const { hotel_name, address, review_score, review_score_word, room, hall } =
    hotelObj;

  const info = type === "room" ? room : hall;
  if (!info) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full">
      {/* Image */}
      <img
        src={type === "room" ? roomImg : hallImg}
        alt={`${hotel_name} ${type}`}
        className="w-full sm:w-48 h-36 object-cover rounded-md"
      />

      {/* Content */}
      <div className="flex flex-col justify-between w-full">
        {/* Hotel Info */}
        <div>
          <h3 className="text-xl font-bold text-primaryText">{hotel_name}</h3>
          <p className="text-sm text-secondaryText">{address}</p>
          <p className="text-sm mt-1 text-secondaryText">
            Rating:{" "}
            <span className="font-semibold text-primaryText">
              {review_score}
            </span>{" "}
            ({review_score_word})
          </p>
        </div>

        {/* Room or Hall Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <div>
            <p className="font-semibold text-secondaryText capitalize">
              {info.type}
            </p>
            <p className="text-sm text-gray-500">
              Capacity: {info.capacity} people
            </p>
          </div>

          <div className="text-right mt-2 sm:mt-0">
            <p className="text-xl font-bold text-accent3">
              ₹{info.all_inclusive_price}
            </p>
            <p className="text-xs text-gray-500 italic">Includes all taxes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Event = () => {
  const {
    name,
    date,
    duration,
    catererVendor,
    decoratorVendor,
    djVendor,
    roomHotel,
    hallHotel,
    totalPrice,
  } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // get data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://event-booking-portal.onrender.com/api/events/user",
          // "http://localhost:5000/api/events/user"
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          dispatch(setName(data.eventData.name));
          dispatch(setDate(data.eventData.date.slice(0, 10)));
          dispatch(setDuration(data.eventData.duration));
          dispatch(setCatererVendor(data.eventData.catererVendor));
          dispatch(setDecoratorVendor(data.eventData.decoratorVendor));
          dispatch(setDJVendor(data.eventData.djVendor));
          dispatch(setRoomHotel(data.eventData.roomHotel));
          dispatch(setHallHotel(data.eventData.hallHotel));
          dispatch(setTotalPrice(data.eventData.totalPrice));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // save data to localstorage
  useEffect(() => {
    const eventData = {
      name,
      date,
      duration,
      catererVendor,
      decoratorVendor,
      djVendor,
      roomHotel,
      hallHotel,
    };
    localStorage.setItem("eventData", JSON.stringify(eventData));
  }, [
    name,
    date,
    duration,
    catererVendor,
    decoratorVendor,
    djVendor,
    roomHotel,
    hallHotel,
  ]);

  // get data from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("eventData");
    if (saved) {
      const parsed = JSON.parse(saved);

      dispatch(setName(parsed.name));
      dispatch(setDate(parsed.date));
      dispatch(setDuration(parsed.duration));
      dispatch(setCatererVendor(parsed.catererVendor));
      dispatch(setDecoratorVendor(parsed.decoratorVendor));
      dispatch(setDJVendor(parsed.djVendor));
      dispatch(setRoomHotel(parsed.roomHotel));
      dispatch(setHallHotel(parsed.hallHotel));
    }
  }, []);

  // dynamically setting the total price
  useEffect(() => {
    const catererPrice = catererVendor?.price || 0;
    const decoratorPrice = decoratorVendor?.price || 0;
    const djPrice = djVendor?.price || 0;
    const dur = duration || 1;
    const roomPrice = roomHotel?.room.all_inclusive_price || 0;
    const hallPrice = hallHotel?.hall.all_inclusive_price || 0;

    const price = Math.ceil(
      (catererPrice + decoratorPrice + djPrice + roomPrice + hallPrice) * dur
    );

    dispatch(setTotalPrice(price));
  }, [
    duration,
    catererVendor,
    decoratorVendor,
    djVendor,
    roomHotel,
    hallHotel,
  ]);

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !date ||
      !duration ||
      !roomHotel ||
      !hallHotel ||
      !totalPrice
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (typeof totalPrice !== "number" || totalPrice <= 0) {
      toast.error("Invalid total price.");
      return;
    }

    try {
      const eventData = {
        name,
        date,
        duration,
        catererVendor,
        decoratorVendor,
        djVendor,
        roomHotel: roomHotel._id,
        hallHotel: hallHotel._id,
        totalPrice,
      };
      const res = await fetch(
        "https://event-booking-portal.onrender.com/api/events/create",
        // "http://localhost:5000/api/events/create"
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(eventData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReset = () => {
    dispatch(setName(""));
    dispatch(setDate(""));
    dispatch(setDuration(1));
    dispatch(setCatererVendor(null));
    dispatch(setDecoratorVendor(null));
    dispatch(setDJVendor(null));
    dispatch(setRoomHotel(null));
    dispatch(setHallHotel(null));
    dispatch(setTotalPrice(0));
    localStorage.removeItem("eventData");
    toast.success("Data is cleared");
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-3 w-[90vw] mx-auto my-4 space-y-2">
        {/* Title */}
        <h2 className="flex font-semibold text-gray-600 items-center gap-1 border-b pb-2">
          <IoCalendar className="text-accent3 text-xl" />
          Event Management Dashboard
        </h2>

        {/* Form Inputs - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold text-secondaryText mb-1">
              Event Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter Event Name"
              className="w-full border rounded-md px-3 py-2 focus:border-accent3 focus:ring focus:ring-accent1/40 text-primaryText"
              onChange={(e) => dispatch(setName(e.target.value))}
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-secondaryText mb-1">
              Event Date
            </label>
            <input
              type="date"
              value={date}
              className="w-full border rounded-md px-3 py-2 focus:border-accent3 focus:ring focus:ring-accent1/40 text-primaryText"
              onChange={(e) => dispatch(setDate(e.target.value))}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-secondaryText mb-1">
              Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              className="w-full border rounded-md px-3 py-2 focus:border-accent3 focus:ring focus:ring-accent1/40 text-primaryText"
              onChange={(e) => dispatch(setDuration(Number(e.target.value)))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-4 w-[90vw] mx-auto my-4">
        <h5 className="flex font-semibold text-gray-600 items-center gap-1 border-b pb-2">
          <GiTheaterCurtains className="text-accent3 text-xl" />
          Venue Details
        </h5>
        <div className="border rounded-lg shadow-md p-3 mt-2">
          {roomHotel ? (
            <HotelCard hotelObj={roomHotel} type="room" />
          ) : (
            <div className="text-gray-600 text-center">
              No room found for this event. Please book a room.
            </div>
          )}
        </div>
        <div className="border rounded-lg shadow-md p-3 mt-2">
          {hallHotel ? (
            <HotelCard hotelObj={hallHotel} type="hall" />
          ) : (
            <div className="text-gray-600 text-center">
              No hall found for this event. Please book a hall.
            </div>
          )}
        </div>
      </div>
      <VendorCard
        vendors={caterers}
        selectedVendor={catererVendor}
        setVendor={setCatererVendor}
        label="Caterer Vendor"
        labelIcon={<MdEmojiFoodBeverage className="text-accent3 text-xl" />}
      />

      <VendorCard
        vendors={decorators}
        selectedVendor={decoratorVendor}
        setVendor={setDecoratorVendor}
        label="Decorator Vendor"
        labelIcon={<GiChanterelles className="text-accent3 text-xl" />}
      />

      <VendorCard
        vendors={djs}
        selectedVendor={djVendor}
        setVendor={setDJVendor}
        label="DJs Vendor"
        labelIcon={<HiAdjustmentsHorizontal className="text-accent3 text-xl" />}
      />

      <div className="bg-white rounded-xl shadow-xl p-4 w-[90vw] mx-auto my-4">
        <h5 className="flex font-semibold text-gray-600 items-center gap-1 mb-2">
          <FaRupeeSign className="text-accent3" />
          Total Price Breakdown:
        </h5>
        <div className="text-primaryText">
          <div className="text-sm flex items-center justify-between mb-1">
            <p className="font-semibold">All-Inclusive Price:</p>
            <p>₹{Math.ceil(totalPrice)}</p>
          </div>
          <div className="text-sm text-green-600 flex items-center justify-between mb-1">
            <p className="font-semibold">Discount (20% off):</p>
            <p>₹{Math.ceil(totalPrice - totalPrice / 1.2)}</p>
          </div>
          <div className=" border-t text-lg font-bold text-accent3 flex items-center justify-between mb-1">
            <p>Final Price: </p>
            <p>₹{Math.floor(totalPrice / 1.2)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button
          className="py-1 px-4 bg-white rounded-lg shadow-lg text-lg hover:bg-red-600 hover:text-white font-semibold transition-all duration-150"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="py-1 px-4 bg-white rounded-lg shadow-lg text-lg hover:bg-accent3 hover:text-white font-semibold transition-all duration-150"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Event;
