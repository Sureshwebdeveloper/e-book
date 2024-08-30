import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/Context";
const ProductedRoute = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return token && <Outlet />;
};

export default ProductedRoute;
