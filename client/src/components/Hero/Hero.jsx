import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import weddingIcon from "../../assets/hindu-wedding.png";
import corporateIcon from "../../assets/calendar.png";
import socialIcon from "../../assets/bar.png";
import privateIcon from "../../assets/party.png";
import leisureIcon from "../../assets/travel-agent.png";
import SearchBar from "../SearchBar/SearchBar";

const categories = [
  {
    id: 1,
    title: "Weddings and Celebrations",
    component: "Weddings",
    icon: weddingIcon,
    roomType: "Rooms",
    guestLabel: "Guests",
  },
  {
    id: 2,
    title: "Corporate Events",
    component: "Corporate",
    icon: corporateIcon,
    roomType: "Meeting Hall",
    guestLabel: "Attendees",
  },
  {
    id: 3,
    title: "Social Gatherings",
    component: "Social",
    icon: socialIcon,
    roomType: "Halls",
    guestLabel: "Guests",
  },
  {
    id: 4,
    title: "Private Functions",
    component: "Private",
    icon: privateIcon,
    roomType: "Rooms",
    guestLabel: "Guests",
  },
  {
    id: 5,
    title: "Leisure and Travel",
    component: "Leisure",
    icon: leisureIcon,
    roomType: "Rooms",
    guestLabel: "Peoples",
  },
];

const Container = ({ children }) => {
  return <div className="md:-mt-3">{children}</div>;
};

const Hero = () => {
  const [active, setActive] = useState("Weddings");
  const [acticeComponent, setActiveComponent] = useState(categories[0]);
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  const handleActiveTab = (type) => {
    setActive(type.component);
    setActiveComponent(type);
  };

  return (
    <div className="mb-10">
      <motion.div
        className="bg-white w-fit m-auto rounded-lg"
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {windowWidth > 750 ? (
          <ul className="-translate-y-10 flex justify-evenly items-center gap-10 bg-white text-primaryText p-2 rounded-lg w-fit m-auto px-8 cursor-pointer shadow-md">
            {categories.map((type) => (
              <li
                key={type.id}
                className={`flex flex-col items-center w-24 text-center pb-2 duration-50 ${
                  active === type.component && "border-b-2 border-accent3"
                }`}
                onClick={() => handleActiveTab(type)}
              >
                <img src={type.icon} alt="icon" className="h-12" />
                <h4 className="text-sm">{type.title}</h4>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
        <h3 className="font-semibold text-accent3 italic w-fit m-auto text-lg text-center md:-translate-y-6">
          Your Event, Your Way - Discover, Choose, and Book the Best Venues and
          Hotels
        </h3>
        {
          <Container>
            <SearchBar category={acticeComponent} />
          </Container>
        }
      </motion.div>
    </div>
  );
};

export default Hero;
