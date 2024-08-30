import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { StoreContext } from "../../context/Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const userOtp = () => {
  const inputRef = useRef([]);
  const [userOtp, setuserOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { url, token, setToken, setSignState } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newuserOtp = [...userOtp];
    // Handle Pasting userOtp
    if (value.length > 1) {
      const pasteuserOtp = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newuserOtp[i] = pasteuserOtp[i] || "";
      }
      setuserOtp(newuserOtp);

      //   Focus on the last non-empty or the first empty one
      const lastFilledIndex = newuserOtp.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex].focus();
    } else {
      newuserOtp[index] = value;
      setuserOtp(newuserOtp);

      //   Move next input if value entered
      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !userOtp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var verificationuserOtp = userOtp.join("");

    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/verify-email`, {
        otp: verificationuserOtp,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        localStorage.setItem("token", response.data.user.token);
        setToken(response.data.user.token);
        setuserOtp(["", "", "", "", "", ""]);
        setSignState("");
        setLoading(false);
      }
    } catch (error) {
      setuserOtp(["", "", "", "", "", ""]);
      if (error.message == "Request failed with status code 400") {
        toast.error("Invalid or Expaired Verifcation Code");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const undefinedToken = localStorage.getItem("token");
    if (undefinedToken && undefinedToken < 10) {
      localStorage.removeItem("token");
      toast.error("Unauthorized Verify Again");
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mx-auto h-screen py-3 bg-[#B5CFB7]">
        {loading ? (
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        ) : (
          <div className="flex flex-col">
            <form
              onSubmit={handleSubmit}
              className=" py-4 rounded-md bg-white px-3 md:px-4 drop-shadow-lg"
            >
              <div className="flex flex-col w-full mx-auto text-center justify-center-items-center pb-4">
                <h1 className="py-4 text-[#211ae8fa] text-2xl font-bold">
                  Verify Your Email
                </h1>
                <p className=" text-black font-bold text-base mx-auto max-w-64 text-center md:max-w-full">
                  Enter the 6-digit code send to your email address
                </p>
              </div>
              <div className="space-x-1 flex items-center justify-around md:space-x-3 ">
                {userOtp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    ref={(el) => (inputRef.current[index] = el)}
                    maxLength={6}
                    value={digit}
                    required={true}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className=" appearance-none  max-w-[45px] py-2 pl-[16px] rounded-md outline-none shadow-md text-zinc-800 font-bold text-lg bg-[#b2b2ff]"
                  />
                ))}
              </div>

              <div className="w-11/12 mx-auto pt-5">
                <button
                  type="submit"
                  className="bg-btn w-full py-2 rounded-md text-white font-medium text-base disabled:bg-zinc-500"
                >
                  Verify Email
                </button>
              </div>
            </form>
            <div
              className="w-full mx-auto drop-shadow-xl rounded-bl-md rounded-br-md  bg-[#8f9ef6]  cursor-pointer"
              onClick={() => setSignState("Sign Up")}
            >
              <div className="flex items-center  rounded py-3 justify-evenly w-full">
                <FaArrowLeft className=" text-xl " />
                <p className="font-bold">Back to SignUp</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default userOtp;
