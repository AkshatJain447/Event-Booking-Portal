import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { HotelSearch } from "../../store/store";
import { Link } from "react-router-dom";

const Private = () => {
  const { setSearchQuery, setLoading } = useContext(HotelSearch);
  const locationRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const roomsRef = useRef(null);
  const personRef = useRef(null);

  const handleSearch = () => {
    setLoading(true);
    const location = locationRef.current.value;
    const checkIn = checkInRef.current.value;
    const checkOut = checkOutRef.current.value;
    const rooms = roomsRef.current.value;
    const person = personRef.current.value;
    setSearchQuery({ location, checkIn, checkOut, rooms, person });

    locationRef.current.value = "";
    checkInRef.current.value = "";
    checkOutRef.current.value = "";
    roomsRef.current.value = "";
    personRef.current.value = "";
  };

  return (
    <div>
      <form className="grid md:grid-cols-3 lg:flex w-fit m-auto p-3">
        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-sm m-1 ml-3">
            Select Location
          </label>
          <input
            ref={locationRef}
            type="text"
            name="location"
            placeholder="Ex.Gurugram"
            className="border border-black rounded-l-lg p-4 font-bold text-2xl h-16 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkIn" className="font-semibold text-sm m-1 ml-3">
            Check In Date
          </label>
          <input
            ref={checkInRef}
            type="date"
            name="checkIn"
            className="border-y border-black p-4 font-bold text-lg h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="checkOut" className="font-semibold text-sm m-1 ml-3">
            Check Out Date
          </label>
          <input
            ref={checkOutRef}
            type="date"
            name="checkOut"
            className="border md:rounded-r-lg lg:rounded-none border-black p-4 font-bold text-lg h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rooms" className="font-semibold text-sm m-1 ml-3">
            Rooms
          </label>
          <input
            ref={roomsRef}
            type="number"
            name="rooms"
            placeholder="0"
            className=" border border-r-0 lg:border-y border-black p-4 font-bold text-2xl lg:w-36 h-16 md:rounded-l-lg lg:rounded-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className="font-semibold text-sm m-1 ml-3">
            Peoples
          </label>
          <input
            ref={personRef}
            type="number"
            name="guests"
            placeholder="0"
            className="border border-black rounded-r-lg p-4 font-bold text-2xl lg:w-36 h-16"
          />
        </div>
      </form>
      <Link to={"/search"}>
        <motion.button
          initial={{ scale: 1.1, translateY: "24px" }}
          animate={{ scale: 1, translateY: "20px" }}
          whileTap={{ scale: 0.9 }}
          className="m-auto -mt-6 font-semibold text-2xl flex items-center gap-1 bg-gradient-to-r from-accent1 to-accent2 pl-6 pr-8 py-1 rounded-full text-white "
          onClick={handleSearch}
        >
          <CiSearch />
          Search
        </motion.button>
      </Link>
    </div>
  );
};

export default Private;
