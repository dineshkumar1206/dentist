import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Preloader from "./components/Preloader";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./home-page/Home";
import About from "./pages/About";
          //  Services 
import Implants from "./services/Implants";
import ChildDentalCare from "./services/ChildDentalCare";
import RootCanal from "./services/RootCanal";
import ToothWhitening from "./services/ToothWhitening";
import UltrasonicCleaning from "./services/UltrasonicCleaning";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./components/Contact";

export default function App() {
  return (
    <BrowserRouter>

       <ScrollToTop/>
      {/* <Preloader /> */}

      <div className="min-h-screen bg-white font-sans antialiased selection:bg-cyan-500 selection:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />

          {/* services */}
          <Route path="services/implants" element={<Implants/>} />
          <Route path="/services/child-dental-care" element={<ChildDentalCare/>}/>
          <Route path="/services/root-canal" element={<RootCanal/>}/>  
          <Route path="/services/whitening" element={<ToothWhitening/>} />
          <Route path="/services/cleaning" element={<UltrasonicCleaning/>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}