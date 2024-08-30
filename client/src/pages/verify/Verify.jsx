import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { StoreContext } from "../../context/Context";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    setLoading(true);
    const response = await axios.post(`${url}/order/verify`, {
      success,
      orderId
    });
    
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/myorders");
      } else{
        setLoading(false);
        navigate("/");
      }
    };

    useEffect(() => {
      verifyPayment();
    }, []);
    
    return (
      <>
      {loading && (
        <>
          <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
            <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
          </div>
        </>
      )}
    </>
  );
};
export default Verify;
