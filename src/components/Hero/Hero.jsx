// import { FaHome } from "react-icons/fa";
// import styles from "./Hero.module.css";
import weddingIcon from "../../assets/hindu-wedding.png";
import corporateIcon from "../../assets/calendar.png";
import socialIcon from "../../assets/bar.png";
import privateIcon from "../../assets/party.png";
import leisureIcon from "../../assets/travel-agent.png";
import Wedding from "../Categories/Wedding";
import Corporate from "../Categories/Corporate";
import Social from "../Categories/Social";
import Private from "../Categories/Private";
import Leisure from "../Categories/Leisure";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Weddings and Celebrations",
    component: "Weddings",
    icon: weddingIcon,
  },
  {
    id: 2,
    title: "Corporate Events",
    component: "Corporate",
    icon: corporateIcon,
  },
  {
    id: 3,
    title: "Social Gatherings",
    component: "Social",
    icon: socialIcon,
  },
  {
    id: 4,
    title: "Private Functions",
    component: "Private",
    icon: privateIcon,
  },
  {
    id: 5,
    title: "Leisure and Travel",
    component: "Leisure",
    icon: leisureIcon,
  },
];

const componentMapping = {
  Weddings: Wedding,
  Corporate: Corporate,
  Social: Social,
  Private: Private,
  Leisure: Leisure,
};

const Container = ({ children }) => {
  return <div className="md:-mt-3">{children}</div>;
};

const Hero = () => {
  const [active, setActive] = useState("Weddings");
  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);
  const ActiveComponent = componentMapping[active];

  return (
    <div className="md:mt-10 ">
      <motion.div
        className="bg-white w-fit m-auto rounded-lg"
        initial={{ opacity: 0, translateY: 130 }}
        animate={{ opacity: 1, translateY: 35 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {windowWidth > 750 ? (
          <ul className=" -translate-y-10 flex justify-evenly items-center gap-10 bg-white text-primaryText p-2 rounded-lg w-fit m-auto px-8 cursor-pointer shadow-md">
            {categories.map((type) => (
              <li
                key={type.id}
                className={`flex flex-col items-center w-24 text-center pb-2 duration-50 ${
                  active === type.component && "border-b-2 border-accent3"
                }`}
                onClick={() => setActive(type.component)}
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
            <ActiveComponent />
          </Container>
        }
      </motion.div>
    </div>
  );
};

export default Hero;
