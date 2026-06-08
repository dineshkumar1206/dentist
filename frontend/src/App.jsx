import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./home-page/Home";

export default function App() {
  return (
    <>
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-cyan-500 selection:text-white">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
    </>
  );
}