import noFound from "../../assets/no-results.png";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HotelCard from "../HotelCard/HotelCard";

const DisplayHotels = ({ hotelList }) => {
  return (
    <div className="flex justify-evenly flex-wrap gap-6 my-3 mx-3 px-2 py-1 md:mb-5 md:mt-0 md:mx-8 drop-shadow-lg">
      {hotelList.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

const EmptyMsg = () => {
  toast.dismiss();
  toast.error("Sorry, no hotels found in this city");

  return (
    <motion.h1
      className="bg-white text-accent1 text-4xl font-bold m-14 md:mt-4 rounded-lg shadow-lg py-10 flex flex-wrap text-center justify-center items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "backOut",
      }}
    >
      <img src={noFound} alt="notFound" className="h-14 mr-2"></img>Sorry, no
      hotels found, Please try another city
    </motion.h1>
  );
};

const QuerySummary = () => {
  const hotelCount = useSelector((state) => state.hotels.hotelCount);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-2 mt-1 items-center w-[93%] mx-auto">
      <button
        className="px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md hover:scale-105 transition-all duration-300"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <div className="px-3 py-1 border border-green-500 rounded-xl shadow-lg tracking-wide font-semibold text-gray-600">
        Found{" "}
        <span className="text-green-500 font-bold">{hotelCount} hotels </span>
        in current city
      </div>
    </div>
  );
};

const HotelList = () => {
  const hotels = useSelector((state) => state.hotels.hotels);
  const loading = useSelector((state) => state.hotels.loading);

  return (
    <>
      {loading ? (
        <Loader />
      ) : hotels.length > 0 ? (
        <>
          {window.innerWidth > 700 && <QuerySummary />}
          <DisplayHotels hotelList={hotels} />
        </>
      ) : (
        <>
          {window.innerWidth > 700 && <QuerySummary />}
          <EmptyMsg />
        </>
      )}
    </>
  );
};

export default HotelList;
