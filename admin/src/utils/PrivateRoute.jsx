import React, { useContext } from "react";
import { StoreContext } from "../context/DataContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoue = () => {
  const { authenticated, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token ) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      { 
      token ? <Outlet /> : null
       }
    </>
  );
};

export default PrivateRoue;
