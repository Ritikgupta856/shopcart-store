import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Banner from "./components/Banner";

import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import SingleProduct from "../pages/SingleProduct";
import Success from "../pages/Success";
import AboutUs from "../pages/AboutUs";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Failure from "../pages/Failure";

function AppContent() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Toaster />
        <Banner />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        {!hideFooter && (
          <>
            <Newsletter />
            <Footer />
          </>
        )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
