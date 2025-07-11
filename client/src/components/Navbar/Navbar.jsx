import { FaPhone, FaHome, FaUserSecret } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthType, setModalState, setUser } from "../../store/userAuthSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/users/logout`,
        // "http://localhost:5000/api/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("User Logged out successfully");
        dispatch(setUser({}));
      }
    } catch (error) {}
  };

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
          {user?.name ? (
            <li
              className="flex items-center gap-1 hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
              onClick={handleLogout}
            >
              LogOut
              <CiLogout />
            </li>
          ) : (
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
          )}
          {user?.role === "user" ? (
            <li className="ml-1 hover:scale-105 border border-gray-400 hover:border-gray-700 rounded-full hover:bg-gray-200 py-2 px-3 duration-150 text-2xl">
              <FaUserTie />
            </li>
          ) : (
            ""
          )}
          {user?.role === "admin" ? (
            <li className="ml-1 hover:scale-105 border border-gray-400 hover:border-gray-700 rounded-full hover:bg-gray-200 py-2 px-3 duration-150 text-2xl">
              <FaUserSecret />
            </li>
          ) : (
            ""
          )}
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
