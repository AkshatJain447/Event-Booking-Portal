import Destinations from "../components/Destinations/Destinations";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Offers from "../components/Offers/Offers";
import "./App.css";

function App() {
  return (
    <div>
      <div id="home" className="pt-2 w-full">
        <Navbar />
        <Hero />
      </div>
      <Offers />
      <Destinations />
      <Footer />
    </div>
  );
}

export default App;
