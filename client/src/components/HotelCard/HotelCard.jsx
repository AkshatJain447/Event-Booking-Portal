import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const HotelCard = ({ hotel }) => {
  const cardRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(cardRef, { once: true });
  const storeSearchQuery = useSelector((state) => state.hotels.searchQuery);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const hasRoom = hotel.room;
  const hasHall = hotel.hall;

  return (
    <motion.div
      ref={cardRef}
      key={hotel.hotel_id}
      className="grid md:grid-cols-5 md:gap-2 lg:w-[47%] rounded-lg shadow-md bg-white min-h-[300px] hover:shadow-xl transition-all duration-300 ease-in-out border hover:border-gray-500 border-transparent"
      variants={{
        hidden: { opacity: 0, translateY: 90 },
        visible: { opacity: 1, translateY: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        duration: 0.1,
        ease: "backOut",
      }}
    >
      <div className="md:col-span-3 flex flex-col justify-between">
        <img
          src={hotel.main_photo_url}
          alt="Hotel"
          className="h-[250px] min-w-[90vw] md:min-w-fit w-full object-cover rounded-lg"
        />
        <div className="flex justify-between items-center px-2 py-2 text-sm">
          {/* Rating + Review */}
          <div className="flex items-center gap-2">
            <h2
              className={`flex items-center gap-1 font-semibold ${
                hotel.review_score >= 7.5 ? "text-blue-800" : "text-orange-500"
              }`}
            >
              <span
                className={`text-white px-2 py-[2px] rounded-md text-sm shadow ${
                  hotel.review_score >= 7.5 ? "bg-blue-800" : "bg-orange-500"
                }`}
              >
                {hotel.review_score}
              </span>
              <span>{hotel.review_score_word}</span>
            </h2>
            <span className="italic text-xs text-gray-500">
              ({hotel.review_nr} reviews)
            </span>
          </div>
          {/* Class Info */}
          <p className="flex items-center gap-1 text-blue-800 font-medium">
            <FaStar className="text-yellow-400 text-base" />
            Class: {hotel.class}
          </p>
        </div>
      </div>
      <div className="md:border-l border-gray-400 px-1 my-1 md:col-span-2 flex flex-col justify-between">
        <div>
          <div className="ml-1 my-1">
            <h1 className="font-bold text-xl text-accent3">
              {hotel.hotel_name}
            </h1>
            <p className="text-gray-600 text-sm">{hotel.address}</p>
          </div>

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
        </div>
        <div className="pt-1 mx-1">
          <p className="text-gray-600">Total Amount:</p>
          {hasRoom && (
            <div className="text-green-700 text-lg font-semibold flex justify-between">
              Room:
              <div>
                ₹
                {Math.ceil(
                  hotel.room.gross_price *
                    storeSearchQuery.rooms *
                    storeSearchQuery.duration
                )}
                <span className="line-through mx-2 font-normal text-secondaryText italic">
                  ₹
                  {Math.ceil(
                    hotel.room.all_inclusive_price *
                      storeSearchQuery.rooms *
                      storeSearchQuery.duration
                  )}
                </span>
              </div>
            </div>
          )}
          {hasHall && (
            <div className="text-purple-700 text-lg font-semibold mt-[1px] flex justify-between">
              Hall:
              <div>
                ₹
                {Math.ceil(
                  hotel.hall.gross_price *
                    storeSearchQuery.halls *
                    storeSearchQuery.duration
                )}
                <span className="line-through mx-2 font-normal text-secondaryText italic">
                  ₹
                  {Math.ceil(
                    hotel.hall.all_inclusive_price *
                      storeSearchQuery.halls *
                      storeSearchQuery.duration
                  )}
                </span>
              </div>
            </div>
          )}
          <button className="bg-blue-100 my-1 py-1 px-3 text-blue-500 rounded-full float-right hover:scale-105 transition-all duration-300 hover:shadow-md hover:bg-blue-200 hover:text-blue-600">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
