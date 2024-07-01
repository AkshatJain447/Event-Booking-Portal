import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import "./App.css";
import { HotelSearch } from "../store/store";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <HotelSearch.Provider
      value={{ searchQuery, setSearchQuery, loading, setLoading }}
    >
      <div>
        <div id="home" className="pt-2 w-full">
          <Navbar />
          <Hero />
        </div>
        <Outlet />
        <Footer />
      </div>
    </HotelSearch.Provider>
  );
}

export default App;
