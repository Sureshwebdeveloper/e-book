import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Order = () => {
  const { getTotalAmount, token, cartItem, data, url } =
    useContext(StoreContext);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

      setLoading(true);
      let orderItems = [];
      data.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: userData,
        items: orderItems,
        amount: getTotalAmount() + 10,
      };

      let response = await axios.post(`${url}/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        setLoading(false);
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error")
        setLoading(false);
      }
  };

  useEffect(() => {
    if (!token || getTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalAmount]);

  return (
    <div>
      <div className="">
        {loading ? (
          <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
            <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
          </div>
        ) : (
          <div className="w-[90%] mx-auto pt-16 flex flex-1 md:py-3">
            <form
              onSubmit={placeOrder}
              className="grid grid-cols-1 max-w-[500px] md:max-w-none mx-auto lg:grid-cols-2 md:h-screen py-10 place-content-center w-full "
            >
              <div className="mx-auto">
                <h1 className="pb-2 font-bold text-xl">Delivery Information</h1>
                <div className="flex md:flex-row items-start md:items-center justify-center space-y-2 md:space-y-0  flex-col w-full md:space-x-3">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={userData.firstName}
                    required
                    placeholder="First name"
                    className="w-[300px] md:w-[350px] lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={userData.lastName}
                    className="w-[300px] md:w-[350px]  lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />
                </div>
                <div className="flex flex-col  space-y-3 mt-3">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                    value={userData.email}
                    placeholder="Email address"
                    className="w-[300px] md:w-full p-2 border-2 border-[#ccc] rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    onChange={handleChange}
                    required
                    value={userData.street}
                    className="w-[300px] md:w-full p-2 border-2 border-[#ccc] rounded-md "
                  />
                </div>

                <div className="flex md:my-3 md:flex-row items-start md:items-center justify-center space-y-2 md:space-y-0  flex-col w-full md:space-x-3">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    required
                    value={userData.city}
                    className="w-[300px] mt-3 md:mt-0 md:w-[350px] lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />

                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    required
                    value={userData.state}
                    className="w-[300px]  md:w-[350px] lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />
                </div>
                <div className="flex md:flex-row md: items-start md:items-center justify-center space-y-2 md:space-y-0  flex-col w-full md:space-x-3">
                  <input
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                    required
                    value={userData.zipcode}
                    placeholder="Zip Code"
                    className="w-[300px] mt-3 md:mt-0 md:w-[350px] lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    onChange={handleChange}
                    required
                    value={userData.country}
                    className="w-[300px] mt-1  md:mt-0 md:w-[350px] lg:w-auto p-2 border-2 border-[#ccc] rounded-md"
                  />
                </div>

                <div className="mt-3 flex md:pb-6">
                  <input
                    type="text"
                    name="phone"
                    required
                    onChange={handleChange}
                    value={userData.phone}
                    placeholder="Phone"
                    className="w-[300px] md:w-[80%] p-2 border-2 border-[#ccc] rounded-md"
                  />
                </div>
              </div>
              <div className="mx-auto  w-[92%] lg:w-full md:px-7 pt-10 md:pt-0">
                <h1 className="pb-6 font-bold text-xl">Cart Totals</h1>
                <div className="flex flex-col space-y-3">
                  <div className=" flex items-center justify-between">
                    <p className="">Subtotal</p>
                    <p className="mr-5">Rs {getTotalAmount()}</p>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between">
                    <p>Delivery Fees</p>
                    <p className="mr-5">Rs {10}</p>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between pb-3">
                    <p>Total</p>
                    <b className="mr-5">Rs {getTotalAmount() + 10}</b>
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-600 font-semibold text-base text-white py-2 rounded max-w-[250px] uppercase"
                  >
                    Proceed To Payment
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
