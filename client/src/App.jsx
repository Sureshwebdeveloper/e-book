import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Footer from "./components/Footer";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Verify from "./pages//verify/Verify.jsx";
import SignIn from "./pages/Auth/SignIn";
import Auth from "./pages/Auth/Auth";
import Otp from "./pages/Auth/Otp.jsx";
import ProductedRoute from "./utils/ProductedRoute.jsx";
import SingleBook from "./components/SingleBook.jsx";
import Cart from "./pages/Shop/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Order from "./components/Order.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import { StoreContext } from "./context/Context.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Notfound from "./components/Notfound.jsx";

const App = () => {
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    if (token === "undefined" || token === undefined) {
      localStorage.removeItem("token");
      toast.error("Un Authorized Login Again");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {token && <Navbar />}
        <Routes>
          {!token && <Route path="/" element={<Auth />} />}
          {token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about-book/:id" element={<SingleBook />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/myorders" element={<MyOrders />} />
            </>
          ) : (
            <Route path="/:data/*" element={<Notfound />} />
          )}

          {!token && (
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          )}
          <Route element={<ProductedRoute />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-otp" element={<Otp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/:data/*" element={<Notfound />} />
          </Route>
        </Routes>
        {token && <Footer />}
      </BrowserRouter>
    </>
  );
};

export default App;
