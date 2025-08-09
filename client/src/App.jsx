import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import AppProvider from "./Context/AppContext";
import AuthProvider from "./Context/AuthContext";
import Banner from "./components/Banner";

import Home from "../pages/Home";
import CategoryPage from "./components/CategoryPage";
import SingleProduct from "./components/SingleProduct";
import Success from "./components/Success";
import AboutUs from "./components/AboutUs";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppContent() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Toaster />
      <AuthProvider>
        <AppProvider>
          <Suspense fallback={<Loader />}>
            <Banner />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/success" element={<Success />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
            {!hideFooter && (
              <>
                <Newsletter />
                <Footer />
              </>
            )}
          </Suspense>
        </AppProvider>
      </AuthProvider>
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
