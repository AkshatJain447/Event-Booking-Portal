import { motion, useInView, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center text-3xl font-bold my-10">
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
      Loading <span className="text-accent3 mx-1">Offers</span>
    </div>
  );
};

const OfferCard = ({ offer }) => {
  const offerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(offerRef, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={offerRef}
      key={offer.id}
      variants={{
        hidden: { opacity: 0, translateX: 90 },
        visible: { opacity: 1, translateX: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        type: "spring",
        duration: 0.5,
        stiffness: 50,
      }}
      className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-72 shadow-md duration-100 cursor-pointer hover:border-accent3 hover:scale-105 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl mb-2 font-semibold">{offer.title}</h3>
        <p className="text-secondaryText">{offer.description}</p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-secondaryText text-sm">T&C's applied</p>
        <p className="text-accent3 font-semibold">VIEW DETAILS</p>
      </div>
    </motion.div>
  );
};

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          "https://event-booking-portal.onrender.com/api/offers/"
          // "http://localhost:5000/api/offers/"
        );
        const data = await response.json();
        setOffers(data.offers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          className="my-10 p-4 rounded-lg shadow-xl w-[90%] border m-auto bg-white"
          initial={{ opacity: 0.5, translateY: 90 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          <motion.h2
            className="text-3xl mb-2 font-bold px-2"
            initial={{ opacity: 0, translateX: 90 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, ease: "backOut", delay: 0.3 }}
          >
            Special Offers
          </motion.h2>
          <div
            className={`flex gap-4 p-2 justify-around overflow-x-scroll offerDisplay`}
          >
            {offers.map((offer) => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Offers;
