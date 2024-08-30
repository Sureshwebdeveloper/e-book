import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/DataContext";

const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { url, token, setToken, authenticated, setAuthenticated } =
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
      const response = await axios.post(`${url}/admin/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("admin", response.data.token);
        setAuthenticated(true);
        toast.success(response.data.message);
        navigate("/");
        console.log("response success data", response.data.token);
        setLoading(false);
        userData.email = "";
        userData.password = "";
      }
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        toast.error("Un Authorized ");
      } else if (error.message == "Request failed with status code 404") {
        toast.error("Wrong Credentials");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setToken(localStorage.getItem("admin"));
    }
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
              <h1 className="text-center text-xl font-black">Admin Log In</h1>
              <div className="flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-5 py-3 outline-none border-b-[2px] border-[#1b1b1b]"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={userData.email}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="px-5 py-3 outline-none border-b-[2px] border-[#1b1b1b]"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={userData.password}
                  required
                />
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="bg-[#425eff] rounded-lg text-white p-2 w-full"
                >
                  Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
