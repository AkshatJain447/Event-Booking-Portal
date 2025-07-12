import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import RegisternLogin from "../components/Register&Login/Register&Login";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../store/userAuthSlice";

function App() {
  const isDashboard = useSelector((state) => state.user.isDashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://event-booking-portal.onrender.com/api/users/userInfo",
          // "http://localhost:5000/api/users/userInfo",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          dispatch(setUser(data.user));
        }
      } catch (error) {
        console.log("Fetch user error:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div
        id="home"
        className={`h-fit pt-2 w-full bg-cover bg-no-repeat flex flex-col items-center gap-10 md:gap-20 justify-between`}
      >
        <Navbar />
        {!isDashboard && <Hero />}
      </div>
      <RegisternLogin />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
