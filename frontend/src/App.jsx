import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Preloader from "./components/Preloader";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./home-page/Home";
import About from "./pages/About";
import Implants from "./services/Implants";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Preloader /> */}

      <div className="min-h-screen bg-white font-sans antialiased selection:bg-cyan-500 selection:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* services */}
          <Route path="services/implants" element={<Implants/>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}