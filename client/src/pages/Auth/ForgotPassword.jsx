import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { StoreContext } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosMail } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSignState, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/forgot-password`, {
        email: email,
      });

      if (response.data.success) {
        setLoading(false);
        setEmail("");
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
      if (error.message == "Request failed with status code 400") {
        toast.error("User not found");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mx-auto h-screen py-3 bg-[#B5CFB7]">
        {loading ? (
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        ) : (
          <div className="flex flex-col bg-white drop-shadow-lg rounded-md ">
            <form onSubmit={handleSubmit} className=" py-6 px-4 ">
              <div className="flex flex-col w-full mx-auto text-center  justify-center-items-center pb-4">
                <h1 className="pb-4 text-[#111111fa] text-2xl font-bold ">
                  Enter Your Registerd Email
                </h1>
                <input
                  type="email"
                  placeholder="Please Enter Email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 pr-3 py-3 border-2  border-[#9e9bfffa] outline-none  rounded-md w-11/12 mx-auto placeholder:pl-6"
                />
                <IoIosMail className="relative left-6 text-xl  -top-9" />
              </div>

              <div className="w-11/12 mx-auto pt-2">
                <button
                  type="submit"
                  className="bg-btn w-full py-2 rounded-md text-white font-medium text-base disabled:bg-zinc-500"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
            <div
              className="w-full mx-auto drop-shadow-xl rounded-l-md rounded-r-md  bg-[#8f9ef6]  cursor-pointer"
              onClick={() => setSignState("Sign In")}
            >
              <div className="flex items-center  rounded py-3 justify-evenly w-full">
                <FaArrowLeft className=" text-xl " />
                <p className="font-bold">Back to Login</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
