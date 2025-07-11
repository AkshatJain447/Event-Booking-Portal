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

const Navlist = ({ isMobile, setIsOpen }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } catch (error) {
      toast.error(data.message);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <ul
      className={`${
        isMobile
          ? "absolute top-16 right-3 bg-white shadow-md rounded-lg text-sm px-3 py-2 flex flex-col-reverse items-end gap-1 z-40"
          : "flex md:flex-row items-center md:gap-2 mr-1 text-lg"
      }`}
    >
      <li
        className="flex items-center gap-1 hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
        onClick={() => navigate("/contact")}
      >
        Contact Us
        <FaPhone />
      </li>
      {!user?.name ? (
        <li
          className=" hover:scale-105 border border-transparent hover:border-gray-500 hover:rounded-full hover:bg-gray-200 py-1 px-3 duration-150"
          onClick={() => {
            dispatch(setModalState(true));
            dispatch(setAuthType("Register"));
          }}
        >
          Register
        </li>
      ) : (
        ""
      )}
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
        <li className="ml-1 hover:scale-105 border border-gray-400 hover:border-gray-700 rounded-full hover:bg-gray-200 py-2 px-3 duration-150 text-xl md:text-2xl">
          <FaUserTie />
        </li>
      ) : (
        ""
      )}
      {user?.role === "admin" ? (
        <li className="ml-1 hover:scale-105 border border-gray-400 hover:border-gray-700 rounded-full hover:bg-gray-200 py-2 px-3 duration-150 text-xl md:text-2xl">
          <FaUserSecret />
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);

  return (
    <motion.div
      className="relative z-50 flex justify-between items-center mx-auto w-[95%] p-2 rounded-full bg-[#ffffff20] backdrop-blur-[2px] shadow-lg"
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
        <Navlist />
      ) : (
        <div className="text-3xl hover:bg-gray-200 rounded-full cursor-pointer">
          <IoReorderThree onClick={() => setIsOpen((prev) => !prev)} />
          {isOpen && <Navlist isMobile={true} setIsOpen={setIsOpen} />}
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
