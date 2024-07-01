import { FaPhone, FaHome } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.div
      className="flex justify-between items-center mx-auto w-[95%] p-2 rounded-full bg-[#ffffff20] backdrop-blur-[2px] shadow-lg"
      initial={{ opacity: 0, scaleX: 0.5 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Link
        to={"/"}
        className="font-bold text-2xl flex items-center gap-1 bg-gradient-to-r from-accent1 to-accent2 px-3 py-1 rounded-full text-white"
      >
        <FaHome /> EventEase
      </Link>
      <ul className="flex items-center gap-6 mr-3 text-lg cursor-pointer">
        <li className="flex items-center gap-1 hover:scale-105 hover:border hover:rounded-full hover:bg-gray-200 p-1 duration-150">
          Contact Us
          <FaPhone />
        </li>
        <li className=" hover:scale-105 hover:border hover:rounded-full hover:bg-gray-200 p-1 duration-150">
          Register
        </li>
        <li className="flex items-center gap-1 hover:scale-105 hover:border hover:rounded-full hover:bg-gray-200 p-1 duration-150">
          LogIn
          <CiLogin />
        </li>
      </ul>
    </motion.div>
  );
};

export default Navbar;
