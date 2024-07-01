import { useEffect, useRef, useState } from "react";
import { HotelData, staticHotelList } from "../../store/store";
import noFound from "../../assets/no-results.png";
import Loader from "../Loader/Loader";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";

const getCoordinates = async (searchQuery, setHotelList, setLoading) => {
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${searchQuery.location}&locale=en-gb`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f0c5e92403msha30f2cec80533c3p1e1f1djsn029a79a5c7cf",
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    getHotels(
      result[0].longitude,
      result[0].latitude,
      searchQuery,
      setHotelList,
      setLoading
    );
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};

const getHotels = async (
  longitude,
  latitude,
  searchQuery,
  setHotelList,
  setLoading
) => {
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?include_adjacency=true&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_ages=5%2C0&order_by=popularity&longitude=${longitude}&room_number=${searchQuery.rooms}&children_number=2&adults_number=${searchQuery.person}&locale=en-gb&checkin_date=${searchQuery.checkIn}&checkout_date=${searchQuery.checkOut}&page_number=0&filter_by_currency=AED&latitude=${latitude}&units=metric`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f0c5e92403msha30f2cec80533c3p1e1f1djsn029a79a5c7cf",
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setHotelList(result.result.slice(0, 10));
    setLoading(false);
    console.log(result.result.slice(0, 10));
  } catch (error) {
    console.error(error);
  }
};

const DisplayHotels = () => {
  return (
    <div className="flex justify-evenly flex-wrap gap-4 my-10 md:my-5 mx-8 px-2 py-1 drop-shadow-lg">
      {staticHotelList.map((hotel) => {
        const cardRef = useRef(null);
        const controls = useAnimation();
        const isInView = useInView(cardRef, { once: true });

        useEffect(() => {
          if (isInView) controls.start("visible");
        }, [isInView, controls]);

        return (
          <motion.div
            ref={cardRef}
            key={hotel.hotel_id}
            className="md:flex gap-2 lg:w-[47%] rounded-md shadow-md bg-white"
            variants={{
              hidden: { opacity: 0, translateY: 90 },
              visible: {
                opacity: 1,
                translateY: 0,
              },
            }}
            initial="hidden"
            animate={controls}
            transition={{
              duration: 0.5,
              ease: "backOut",
            }}
          >
            <div className="">
              <img
                src={hotel.max_photo_url}
                alt="Hotel"
                className="h-[250px] w-[400px] rounded-lg"
              />
              <div className="ml-2 my-1">
                <h1 className="font-bold text-xl ">{hotel.hotel_name}</h1>
                <p className="text-accent3">
                  {hotel.address}, {hotel.district}
                </p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-purple-600 text-sm" />
                  <span className="italic text-purple-600">
                    {hotel.distances[0]?.text}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:border-l border-black pl-2 my-3">
              <div className="flex gap-1 items-center">
                <h2
                  className={`flex items-center text-xl gap-1 font-bold ${
                    hotel.review_score >= 7.5
                      ? "text-blue-800 "
                      : "text-orange-500"
                  }`}
                >
                  <p className="inline-block">{hotel.review_score_word}</p>
                  <span
                    className={` text-white px-[6px] rounded-md shadow-lg ${
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
              <p className="flex items-center gap-1 mt-2">
                <FaStar className="text-sm" /> Check In Timing:
              </p>
              <p>
                From
                <input
                  type="text"
                  defaultValue={hotel.checkin.from}
                  readOnly
                  className="text-blue-800 w-16 border rounded-md border-gray-400 text-right pr-1 mx-1"
                />
                to
                <input
                  type="text"
                  defaultValue={hotel.checkin.until}
                  readOnly
                  className="text-blue-800 w-16 border rounded-md border-gray-400 text-right pr-1 mx-1 "
                />
              </p>
              <p className="flex items-center gap-1">
                <FaStar className="text-sm" /> Check Out Timing:
              </p>
              <p className="mb-4">
                From
                <input
                  type="text"
                  defaultValue={hotel.checkout.from}
                  readOnly
                  className="text-blue-800 w-16 border rounded-md border-gray-400 text-right pr-1 mx-1"
                />
                to
                <input
                  type="text"
                  defaultValue={hotel.checkout.until}
                  readOnly
                  className="text-blue-800 w-16 border rounded-md border-gray-400 text-right pr-1 mx-1 "
                />
              </p>
              <div className=" flex flex-wrap">
                {hotel.is_free_cancellable && (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-purple-600 text-purple-600">
                    Free Cancellable
                  </p>
                )}
                {hotel.is_mobile_deal === 1 ? (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-green-500 text-green-500">
                    Mobile Deal
                  </p>
                ) : (
                  ""
                )}
                {hotel.is_no_prepayment_block && (
                  <p className="border px-2 py-[2px] mr-2 mb-2 rounded-md border-accent3 text-accent3">
                    No Prepayment
                  </p>
                )}
              </div>
              <div className=" border-t border-black pt-1 mr-2">
                <p className="">Total amount:</p>
                <p className=" text-green-700 text-xl font-semibold">
                  ₹{hotel.price_breakdown.gross_price}
                  <span className="line-through mx-2 font-normal text-secondaryText">
                    ₹({hotel.price_breakdown.all_inclusive_price})
                  </span>
                </p>
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
  const [hotelList, setHotelList] = useState([]);
  // const { searchQuery, loading, setLoading } = useContext(HotelSearch);
  // if (searchQuery) getCoordinates(searchQuery, setHotelList, setLoading);

  return (
    <>
      <HotelData.Provider value={hotelList}>
        <DisplayHotels />
        {/* {loading ? (
          <Loader />
        ) : hotelList.length > 0 ? (
          <DisplayHotels />
        ) : (
          <EmptyMsg />
        )} */}
      </HotelData.Provider>
    </>
  );
};

export default HotelList;
