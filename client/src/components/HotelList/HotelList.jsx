import { useEffect, useRef, useState } from "react";
import { HotelData, staticHotelList } from "../../store/store";
import noFound from "../../assets/no-results.png";
import Loader from "../Loader/Loader";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";

const DisplayHotels = ({ hotelList }) => {
  return (
    <div className="flex justify-evenly flex-wrap gap-4 my-10 md:my-5 mx-8 px-2 py-1 drop-shadow-lg">
      {hotelList.map((hotel) => {
        const cardRef = useRef(null);
        const controls = useAnimation();
        const isInView = useInView(cardRef, { once: true });

        useEffect(() => {
          if (isInView) controls.start("visible");
        }, [isInView, controls]);

        const hasRoom = hotel.room;
        const hasHall = hotel.hall;

        return (
          <motion.div
            ref={cardRef}
            key={hotel.hotel_id}
            className="md:flex gap-2 lg:w-[47%] rounded-md shadow-md bg-white"
            variants={{
              hidden: { opacity: 0, translateY: 90 },
              visible: { opacity: 1, translateY: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{
              duration: 0.5,
              ease: "backOut",
            }}
          >
            <div>
              <img
                src={hotel.main_photo_url}
                alt="Hotel"
                className="h-[250px] w-[400px] rounded-lg"
              />
              <div className="ml-2 my-1">
                <h1 className="font-bold text-xl">{hotel.hotel_name}</h1>
                <p className="text-accent3">
                  {hotel.address}, {hotel.district}
                </p>
              </div>
            </div>
            <div className="md:border-l border-black pl-2 my-3">
              <div className="flex gap-1 items-center">
                <h2
                  className={`flex items-center text-xl gap-1 font-bold ${
                    hotel.review_score >= 7.5
                      ? "text-blue-800"
                      : "text-orange-500"
                  }`}
                >
                  <p className="inline-block">{hotel.review_score_word}</p>
                  <span
                    className={`text-white px-[6px] rounded-md shadow-lg ${
                      hotel.review_score >= 7.5
                        ? "bg-blue-800"
                        : "bg-orange-500"
                    }`}
                  >
                    {hotel.review_score}
                  </span>
                </h2>
                <span className="italic text-sm">
                  ({hotel.review_nr} reviews)
                </span>
              </div>

              <p className="flex items-center gap-1 text-blue-800 mt-2 text-lg">
                <FaStar className="text-sm" /> Class: {hotel.class}
              </p>

              <p className="mt-2 font-semibold">Check-In:</p>
              <p>
                From{" "}
                <span className="text-blue-800">{hotel.checkin?.from}</span> to{" "}
                <span className="text-blue-800">{hotel.checkin?.until}</span>
              </p>

              <p className="mt-1 font-semibold">Check-Out:</p>
              <p>
                From{" "}
                <span className="text-blue-800">{hotel.checkout?.from}</span> to{" "}
                <span className="text-blue-800">{hotel.checkout?.until}</span>
              </p>

              <div className="flex flex-wrap mt-3">
                {hotel.is_free_cancellable && (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-purple-600 text-purple-600">
                    Free Cancellable
                  </p>
                )}
                {hotel.is_no_prepayment_block && (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-accent3 text-accent3">
                    No Prepayment
                  </p>
                )}
                {hotel.cc_required && (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-red-400 text-red-500">
                    Credit Card Required
                  </p>
                )}
              </div>

              <div className="border-t border-black pt-1 mr-2">
                <p className="font-semibold">Total Amount:</p>
                {hasRoom && (
                  <p className="text-green-700 text-xl font-semibold">
                    ₹{hotel.room.gross_price}
                    <span className="line-through mx-2 font-normal text-secondaryText">
                      ₹{hotel.room.all_inclusive_price}
                    </span>
                  </p>
                )}
                {hasHall && (
                  <p className="text-purple-700 text-xl font-semibold mt-1">
                    ₹{hotel.hall.gross_price} (Hall)
                    <span className="line-through mx-2 font-normal text-secondaryText">
                      ₹{hotel.hall.all_inclusive_price}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const EmptyMsg = () => {
  return (
    <motion.h1
      className="bg-white text-accent1 text-4xl font-bold m-14 rounded-lg shadow-lg py-10 flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: "backOut",
      }}
    >
      <img src={noFound} alt="notFound" className="h-14 mr-2"></img>Sorry, no
      hotels found
    </motion.h1>
  );
};

const HotelList = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await fetch(
          "http://localhost:5000/api/hotels/city/GOI/room"
        );
        const response = await data.json();
        setHotelData(response.hotels);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : hotelData.length > 0 ? (
        <DisplayHotels hotelList={hotelData} />
      ) : (
        <EmptyMsg />
      )}
      {/* <HotelData.Provider value={hotelList}>
        <DisplayHotels />
        
      </HotelData.Provider> */}
    </>
  );
};

export default HotelList;
