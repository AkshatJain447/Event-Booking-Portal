import agra from "../../assets/agra.jpg";
import jaipur from "../../assets/jaipur.jpg";
import goa from "../../assets/goa.jpg";
import kerala from "../../assets/kerela.jpg";
import manali from "../../assets/manali.jpg";
import varanasi from "../../assets/varanasi.jpg";
import mumbai from "../../assets/mumbai.jpg";
import delhi from "../../assets/delhi.jpg";
import udaipur from "../../assets/udaipur.jpg";
import darjeeling from "../../assets/darjeeling.jpg";
import rishikesh from "../../assets/rishikesh.jpg";
import jaisalmer from "../../assets/jaisalmer.jpg";
import shimla from "../../assets/shimla.jpg";
import kolkata from "../../assets/kolkata.jpg";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, useInView, useAnimation } from "framer-motion";

const popularDestinations = [
  {
    id: 1,
    location: "Agra",
    description: "Home of the iconic Taj Mahal.",
    img: agra,
  },
  {
    id: 2,
    location: "Jaipur",
    description: "The Pink City with majestic palaces.",
    img: jaipur,
  },
  {
    id: 3,
    location: "Goa",
    description: "Famous for its beaches and vibrant nightlife.",
    img: goa,
  },
  {
    id: 4,
    location: "Kerala",
    description: "Known for its backwaters and lush greenery.",
    img: kerala,
  },
  {
    id: 5,
    location: "Manali",
    description: "A beautiful hill station in the Himalayas.",
    img: manali,
  },
  {
    id: 6,
    location: "Varanasi",
    description: "A spiritual city on the banks of the Ganges.",
    img: varanasi,
  },
  {
    id: 7,
    location: "Mumbai",
    description: "The bustling city of dreams.",
    img: mumbai,
  },
  {
    id: 8,
    location: "Delhi",
    description: "The capital city with rich history.",
    img: delhi,
  },
  {
    id: 9,
    location: "Udaipur",
    description: "The City of Lakes.",
    img: udaipur,
  },
  {
    id: 10,
    location: "Darjeeling",
    description: "Famous for its tea gardens and scenic beauty.",
    img: darjeeling,
  },
  {
    id: 11,
    location: "Rishikesh",
    description: "A hub for yoga and adventure sports.",
    img: rishikesh,
  },
  {
    id: 12,
    location: "Jaisalmer",
    description: "The Golden City in the Thar Desert.",
    img: jaisalmer,
  },
  {
    id: 13,
    location: "Shimla",
    description: "A popular hill station with colonial architecture.",
    img: shimla,
  },
  {
    id: 14,
    location: "Kolkata",
    description: "The cultural capital of India.",
    img: kolkata,
  },
];

const Modal = ({ dest, setIsOpen }) => {
  return (
    <motion.div
      key={dest.id}
      style={{
        backgroundImage: `url(${dest.img})`,
        backgroundSize: "cover",
      }}
      className="fixed top-[20%] left-1/4 -translate-x-1/4 -translate-y-[20%] shadow-md drop-shadow-lg h-[450px] w-[800px] flex flex-col justify-end rounded-md duration-150 z-20"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        type: "spring",
      }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <IoClose
        className="absolute top-0 right-0 m-3 text-white hover:text-red-400 hover:text-3xl hover:font-bold duration-100 text-2xl cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="text-right bg-gradient-to-b p-1 from-transparent to-[#1a1a1ab9] rounded-md">
        <h4 className="font-semibold text-3xl text-white tracking-wider">
          {dest.location}
        </h4>
        <p className="italic text-white text-lg">{dest.description}</p>
      </div>
    </motion.div>
  );
};

const Destinations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const isCardInView = useInView(containerRef, { once: true });
  const isHeadInView = useInView(headingRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isCardInView) controls.start("show");
    if (isHeadInView) controls.start("slide");
  }, [isCardInView, isHeadInView, controls]);

  const handleModal = (dest) => {
    setSelectedDest(dest);
    setIsOpen(true);
  };

  return (
    <motion.div
      ref={containerRef}
      className="my-10 p-4 rounded-lg shadow-xl w-[90%] border m-auto bg-white"
      variants={{
        hidden: { opacity: 0, translateY: 90 },
        show: { opacity: 1, translateY: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <motion.h2
        ref={headingRef}
        className="text-3xl mb-4 font-bold px-2"
        variants={{
          hidden: { opacity: 0, translateX: 90 },
          slide: { opacity: 1, translateX: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.4, ease: "backOut", delay: 0.5 }}
      >
        Popular Destinations
      </motion.h2>
      <div className="grid grid-cols-4 gap-4">
        {popularDestinations.map((dest) => {
          const cardRef = useRef(null);
          const isInView = useInView(cardRef, { once: true });
          const controls = useAnimation();

          useEffect(() => {
            if (isInView) controls.start("visible");
          }, [isInView, controls]);

          return (
            <motion.div
              ref={cardRef}
              key={dest.id}
              style={{
                backgroundImage: `url(${dest.img})`,
                backgroundSize: "cover",
              }}
              variants={{
                hidden: { opacity: 0, translateY: 90 },
                visible: { opacity: 1, translateY: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{
                type: "spring",
                duration: 0.5,
                stiffness: 50,
              }}
              className="shadow-md drop-shadow-lg h-[200px] flex flex-col justify-end hover:scale-105 rounded-md duration-150 cursor-pointer"
              onClick={() => handleModal(dest)}
            >
              <div className="text-right bg-gradient-to-b p-1 from-transparent to-[#1a1a1ab9] rounded-md">
                <h4 className="font-semibold text-xl text-white tracking-wider">
                  {dest.location}
                </h4>
                <p className="italic text-white">{dest.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {isOpen && selectedDest && (
        <Modal dest={selectedDest} setIsOpen={setIsOpen} />
      )}
    </motion.div>
  );
};

export default Destinations;
