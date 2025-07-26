import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setHotelCount,
  setHotels,
  setLoading,
  setStoreSearchQuery,
} from "../../store/hotelSlice";
import { toast } from "react-hot-toast";

const cityMap = {
  "new delhi": "DEL",
  newdelhi: "DEL",
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
  agra: "AGR",
  udaipur: "UDA",
  varanasi: "VAR",
  shimla: "SHL",
  rishikesh: "RIS",
  manali: "MNL",
};

const SearchBar = ({ category }) => {
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    halls: 1,
    peoples: 2,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    navigate(`/search`);

    // location pre validation
    if (searchQuery.location.trim() === "") {
      toast.dismiss();
      toast.error("Please enter a location");
      dispatch(setLoading(false));
      return;
    }
    const cityCode =
      cityMap[searchQuery.location.toLowerCase().trim()] ||
      searchQuery.location;
    const type = category.roomType !== "Rooms" ? "hall" : "room";

    // API request for hotels and seting storesearchquery
    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/hotels/city/${cityCode}/${type}`
        // `http://localhost:5000/api/hotels/city/${cityCode}/${type}`
      );
      const data = await response.json();
      dispatch(setHotels(data.hotels));
      dispatch(setHotelCount(data.hotelCount));

      const duration =
        (new Date(searchQuery.checkOut) - new Date(searchQuery.checkIn)) /
        (1000 * 60 * 60 * 24);
      const storeSearchQuery = {
        duration,
        rooms: searchQuery.rooms,
        halls: searchQuery.halls,
        peoples: searchQuery.peoples,
      };
      dispatch(setStoreSearchQuery(storeSearchQuery));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // fetching current and tomorrow date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

    setSearchQuery((prev) => ({
      ...prev,
      checkIn: today,
      checkOut: tomorrowFormatted,
    }));
  }, []);

  return (
    <form onSubmit={handleSearch} className=" w-fit m-auto p-3">
      <div className="grid md:grid-cols-3 lg:flex justify-center">
        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-sm m-1 ml-3">
            Select Location
          </label>
          <input
            type="text"
            value={searchQuery.location}
            name="location"
            placeholder="Ex.Jaipur"
            className="border border-black rounded-lg md:rounded-r-none md:rounded-l-lg p-1 md:p-4 font-bold text-2xl md:h-16"
            onChange={(e) =>
              setSearchQuery((prev) => ({
                ...prev,
                location: `${e.target.value}`,
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkIn" className="font-semibold text-sm m-1 ml-3">
            Check In Date
          </label>
          <input
            type="date"
            name="checkIn"
            value={searchQuery.checkIn}
            className="rounded-lg md:rounded-none border md:border-x-0 md:border-y border-black p-1 md:p-4 font-bold text-lg md:h-16"
            onChange={(e) =>
              setSearchQuery((prev) => ({
                ...prev,
                checkIn: `${e.target.value}`,
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkOut" className="font-semibold text-sm m-1 ml-3">
            Check Out Date
          </label>
          <input
            type="date"
            name="checkOut"
            value={searchQuery.checkOut}
            className="border rounded-l-lg md:rounded-l-none rounded-r-lg lg:rounded-none border-black p-1 md:p-4 font-bold text-lg md:h-16"
            onChange={(e) =>
              setSearchQuery((prev) => ({
                ...prev,
                checkOut: `${e.target.value}`,
              }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rooms" className="font-semibold text-sm m-1 ml-3">
            {category.roomType}
          </label>
          <input
            type="number"
            name="rooms"
            min={0}
            placeholder="0"
            className=" border md:border-r-0 lg:border-y border-black p-1 md:p-4 font-bold text-2xl lg:w-36 md:h-16 rounded-r-lg md:rounded-r-none rounded-l-lg lg:rounded-none"
            onChange={(e) =>
              category.roomType === "Rooms"
                ? setSearchQuery((prev) => ({ ...prev, rooms: e.target.value }))
                : setSearchQuery((prev) => ({ ...prev, halls: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className="font-semibold text-sm m-1 ml-3">
            {category.guestLabel}
          </label>
          <input
            type="number"
            name="guests"
            min={0}
            placeholder="0"
            className="border border-black rounded-l-lg md:rounded-l-none rounded-r-lg p-1 md:p-4 font-bold text-2xl lg:w-36 md:h-16"
            onChange={(e) =>
              setSearchQuery((prev) => ({ ...prev, peoples: e.target.value }))
            }
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
