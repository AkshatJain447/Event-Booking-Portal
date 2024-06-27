import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

const Leisure = () => {
  return (
    <div>
      <form className="flex w-fit m-auto p-3">
        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-sm m-1 ml-3">
            Select Location
          </label>
          <input
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
            type="date"
            name="checkOut"
            className="border border-black p-4 font-bold text-lg h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rooms" className="font-semibold text-sm m-1 ml-3">
            Rooms
          </label>
          <input
            type="number"
            name="rooms"
            placeholder="0"
            className="border-y border-black  p-4 font-bold text-2xl w-36 h-16"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guests" className="font-semibold text-sm m-1 ml-3">
            Peoples
          </label>
          <input
            type="number"
            name="guests"
            placeholder="0"
            className="border border-black rounded-r-lg p-4 font-bold text-2xl w-36 h-16"
          />
        </div>
      </form>
      <motion.button
        initial={{ scale: 1.1, translateY: "24px" }}
        animate={{ scale: 1, translateY: "20px" }}
        whileTap={{ scale: 0.9 }}
        className="m-auto -mt-6 font-semibold text-2xl flex items-center gap-1 bg-gradient-to-r from-accent1 to-accent2 pl-6 pr-8 py-1 rounded-full text-white "
      >
        <CiSearch />
        Search
      </motion.button>
    </div>
  );
};

export default Leisure;
