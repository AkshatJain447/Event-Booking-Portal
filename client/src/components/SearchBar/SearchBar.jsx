import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHotelCount, setHotels, setLoading } from "../../store/hotelSlice";
import { toast } from "react-hot-toast";

const cityMap = {
  "new delhi": "DEL",
  delhi: "DEL",
  mumbai: "BOM",
  bangalore: "BLR",
  hyderabad: "HYD",
  chennai: "MAA",
  kolkata: "CCU",
  goa: "GOI",
  ahmedabad: "AMD",
  pune: "PNQ",
  jaipur: "JAI",
};

const SearchBar = ({ category }) => {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    navigate(`/search`);

    if (location.trim() === "") {
      toast.dismiss();
      toast.error("Please enter a location");
      dispatch(setLoading(false));
      return;
    }
    const cityCode = cityMap[location.toLowerCase()] || location;
    const type = category.roomType !== "Rooms" ? "hall" : "room";

    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/hotels/city/${cityCode}/${type}`
      );
      const data = await response.json();
      dispatch(setHotels(data.hotels));
      dispatch(setHotelCount(data.hotelCount));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSearch} className=" w-fit m-auto p-3">
      <div className="grid md:grid-cols-3 lg:flex justify-center">
        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-sm m-1 ml-3">
            Select Location
          </label>
          <input
            type="text"
            value={location}
            name="location"
            placeholder="Ex.Jaipur"
            className="border border-black rounded-lg md:rounded-r-none md:rounded-l-lg p-1 md:p-4 font-bold text-2xl md:h-16"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkIn" className="font-semibold text-sm m-1 ml-3">
            Check In Date
          </label>
          <input
            type="date"
            name="checkIn"
            className="rounded-lg md:rounded-none border md:border-x-0 md:border-y border-black p-1 md:p-4 font-bold text-lg md:h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkOut" className="font-semibold text-sm m-1 ml-3">
            Check Out Date
          </label>
          <input
            type="date"
            name="checkOut"
            className="border rounded-l-lg md:rounded-l-none rounded-r-lg lg:rounded-none border-black p-1 md:p-4 font-bold text-lg md:h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rooms" className="font-semibold text-sm m-1 ml-3">
            {category.roomType}
          </label>
          <input
            type="number"
            name="rooms"
            placeholder="0"
            className=" border md:border-r-0 lg:border-y border-black p-1 md:p-4 font-bold text-2xl lg:w-36 md:h-16 rounded-r-lg md:rounded-r-none rounded-l-lg lg:rounded-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className="font-semibold text-sm m-1 ml-3">
            {category.guestLabel}
          </label>
          <input
            type="number"
            name="guests"
            placeholder="0"
            className="border border-black rounded-l-lg md:rounded-l-none rounded-r-lg p-1 md:p-4 font-bold text-2xl lg:w-36 md:h-16"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <motion.button
          type="submit"
          initial={{ scale: 1.1, translateY: "24px" }}
          animate={{ scale: 1, translateY: "20px" }}
          whileTap={{ scale: 0.9 }}
          className="m-auto -mt-6 font-semibold text-2xl flex items-center gap-1 bg-gradient-to-r from-accent1 to-accent2 pl-6 pr-8 py-1 rounded-full text-white "
        >
          <CiSearch />
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;
