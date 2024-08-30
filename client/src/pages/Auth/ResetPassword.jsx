import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/Context";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate("");
  const { setSignState, url } = useContext(StoreContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${url}/user/reset-password/${token}`,
          {
            password: password,
          }
        );

        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (error) {
        setLoading(true);
        console.log(error);
        if (error.message == "Request failed with status code 400") {
          toast.error("Invalid Or Expaired Token");
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password Did Not Match");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mx-auto h-screen py-3 bg-[#B5CFB7]">
        {loading ? (
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        ) : (
          <div className="flex flex-col bg-white drop-shadow-lg rounded-md ">
            <form onSubmit={handleSubmit} className=" py-6 px-6 ">
              <div className="flex space-y-6 flex-col w-full mx-auto text-center  justify-center-items-center pb-4">
                <h1 className="pb-4 text-[#1810fffa] text-2xl font-bold ">
                  Reset Password
                </h1>

                <input
                  type="password"
                  placeholder="New Password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 px-12 border-[#1810fffa] outline-none py-2 rounded-md w-11/12 mx-auto placeholder:pl-6"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-2 px-12 border-[#1810fffa] outline-none py-2 rounded-md w-11/12 mx-auto placeholder:pl-6"
                />
              </div>

              <div className="w-11/12 mx-auto pt-2">
                <button
                  type="submit"
                  className="bg-[#1810fffa] w-full py-2 rounded-md text-white font-medium text-base disabled:bg-zinc-500"
                >
                  Set New Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
