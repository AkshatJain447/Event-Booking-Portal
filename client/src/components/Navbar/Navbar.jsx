import { FaPhone, FaHome } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthType, setModalState } from "../../store/userAuthSlice";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <motion.div
      className="flex justify-between items-center mx-auto w-[95%] p-2 rounded-full bg-[#ffffff20] backdrop-blur-[2px] shadow-lg"
      initial={{ opacity: 0, scaleX: 0.5 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      id="navbar"
    >
      <Link
        to={"/"}
        className="font-bold text-2xl flex items-center gap-1 bg-gradient-to-r from-accent1 to-accent2 px-3 py-1 rounded-full text-white"
      >
        <FaHome /> EventEase
      </Link>
      {windowWidth > 750 ? (
        <ul className="flex items-center gap-2 mr-1 text-lg cursor-pointer">
          <li
            className="flex items-center gap-1 hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
            onClick={() => navigate("/contact")}
          >
            Contact Us
            <FaPhone />
          </li>
          <li
            className=" hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
            onClick={() => {
              dispatch(setModalState(true));
              dispatch(setAuthType("Register"));
            }}
          >
            Register
          </li>
          <li
            className="flex items-center gap-1 hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
            onClick={() => {
              dispatch(setModalState(true));
              dispatch(setAuthType("Login"));
            }}
          >
            LogIn
            <CiLogin />
          </li>
        </ul>
      ) : (
        <div className="text-3xl hover:bg-gray-200 rounded-full cursor-pointer">
          <IoReorderThree />
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
