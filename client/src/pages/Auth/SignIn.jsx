import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaLock} from "react-icons/fa"
import {IoIosMail} from "react-icons/io"


const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { url, token, setToken, signState, setSignState } =
    useContext(StoreContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (response.data.success) {
        setToken(response.data.user.token)
        localStorage.setItem("token", response.data.user.token);
        toast.success(response.data.message);
        navigate("/");
        setLoading(false);
        userData.email = "";
        userData.password = "";
      }
    } catch (error) {
      
      if (error.message == "Request failed with status code 400") {
        toast.error("User Not Found");
      }else if (error.message =="Request failed with status code 404") {
        toast.error("Wrong Credentials")
      }
       else if (error.message == "Request failed with status code 409") {
        toast.error("User Email Already Exists");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    token && navigate("/");
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center mx-auto h-screen py-3 bg-[#B5CFB7]">
        {loading ? (
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="max-sm:py-[15px] max-sm:px-[5%] rounded-lg bg-[#ffffff] drop-shadow-lg px-10 py-8 space-y-3"
            >
              <h1 className="text-center text-xl font-black">Log In</h1>
              <div className="flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="pl-8 pr-3 py-3  outline-none border-b-[2px] border-[#1b1b1b]"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={userData.email}
                  required
                />
                 <IoIosMail className="relative text-xl -top-9"/>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="pl-8 pr-3 py-3 outline-none border-b-[2px] border-[#1b1b1b]"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={userData.password}
                  required
                />
                 <FaLock className="relative -top-8"/>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-btn rounded-lg text-white p-2 w-full"
                >
                  Login
                </button>
              </div>

              <div className="flex justify-around">
                Dont have Account ?
                <p
                  className="cursor-pointer ml-2 text-black font-black text-base"
                  onClick={() => setSignState("Sign Up")}
                >
                  Signup here
                </p>
              </div>
              <div className="flex justify-around">
                Forgot Password ?
                <p
                  className="cursor-pointer ml-2 text-black font-black text-base"
                  onClick={() => setSignState("Forgot Password")}
                >
                  Reset Password
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
