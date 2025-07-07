import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <div>
      <div id="home" className="pt-2 w-full">
        <Navbar />
        <Hero />
      </div>
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
