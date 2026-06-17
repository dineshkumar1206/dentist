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
import FixedBraces from "./services/FixedBraces";
import FullTeethsets from "./services/FullTeethsets";
import GumTreatment from "./services/GumTreatment";
import SurgicalRemoval from "./services/SurgicalRemoval";
import CustomCursor from "./components/Customcursor";

export default function App() {
  return (
    <BrowserRouter>
       <CustomCursor/> 
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
          <Route path="/services/braces" element={<FixedBraces/>} />
          <Route path="/services/teethsets" element={<FullTeethsets/>} />
          <Route path="/services/gum-treatment" element={<GumTreatment/>} />
          <Route path="/services/wisdom-teeth" element={<SurgicalRemoval/>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}