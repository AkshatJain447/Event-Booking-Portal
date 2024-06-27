import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const offerContainer = [
  {
    id: 1,
    title: "Summer Wedding Discount",
    description:
      "Book your wedding this summer and get 20% off on venue booking.",
  },
  {
    id: 2,
    title: "Early Bird Special",
    description:
      "Plan ahead and save! Book your event 6 months in advance and get 20% off.",
  },
  {
    id: 3,
    title: "Last-Minute Deal",
    description: "Need a venue fast? Get 30% off on last-minute bookings!",
  },
  {
    id: 4,
    title: "Wedding Package",
    description:
      "Get a complete wedding package (Venue + Catering + DJ) at 25% off.",
  },
  {
    id: 5,
    title: "Referral Bonus",
    description: "Refer a friend and get $50 off your next booking.",
  },
  {
    id: 6,
    title: "Loyalty Program",
    description:
      "Earn points with every booking and redeem for discounts on future events.",
  },
  {
    id: 7,
    title: "Corporate Package",
    description:
      "Exclusive corporate rates: Book 3 events and get the 4th at 10% off.",
  },
  {
    id: 8,
    title: "Holiday Special",
    description:
      "Celebrate the holidays with us! Get 15% off on all bookings for December.",
  },
  {
    id: 9,
    title: "Weekend Getaway",
    description: "Book a weekend event and enjoy a complimentary night's stay.",
  },
];

const Offers = () => {
  return (
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
        {offerContainer.map((offer) => {
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
        })}
      </div>
    </motion.div>
  );
};

export default Offers;
