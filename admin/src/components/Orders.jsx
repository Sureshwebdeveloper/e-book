import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/DataContext";
import { toast } from "react-toastify";
import { FaBook } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa6";
import Loader from "./Loader";

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { url,loading,setLoading } = useContext(StoreContext);
  const fetchAllOrders = async () => {
    setLoading(true)
    const response = await axios.get(`${url}/order/list`);
    if (response.data.success) {
      setLoading(false)
      setUserOrders(response.data.data);
    } else {
      setLoading(false)
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(`${url}/order/status/`, {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
    {loading ? <Loader/> : (
    <div className="lg:mx-[3vw] lg:mb-[4vh] min-h-screen py-11 md:pb-0 text-base mx-5">
      <h1 className="text-center pt-20 font-bold font-sans text-3xl pb-8">
        User Orders
      </h1>
      <div
        id="order-list"
        className="md:grid md:grid-cols-2 gap-8 space-y-3 md:space-y-0 pt-3 md:pt-0"
      >
        {userOrders.map((order, index) => {
          return (
            <div
              key={index}
              id="order-item"
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr`] items-center gap-[30px] text-base py-[10px] px-5 border border-[#7687] rounded-md"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-3 md:m-0">
                  <FaBook className=" text-2xl text-[#000000] w-[50px]" />
                  <p id="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.bookTitle + " x " + item.quantity;
                      } else {
                        return item.bookTitle + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                </div>
                <p id="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div>
                  <p id="order-item-street">{order.address.street + ", "}</p>
                  <p id="order-item-city">
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode +
                      ", "}
                  </p>
                </div>

                <p id="order-item-state">{order.address.phone}</p>
                <p>Items: {order.items.length}</p>
                <p>Rs {order.amount}</p>
                <div className="flex items-center">
                  <p className="flex items-center">Payment Status :</p>
                  {order.payment ? <><FaMoneyCheck className="ml-3 text-green-600"/> <b className="ml-3">Paid</b> </>: <b>Not Paid</b>}
                </div>
       
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className=" bg-green-200 py-2 rounded outline-none border border-black text-black"
                >
                  <option value="Order Processing">Order Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>)}
    </>
  );
};

export default Orders;
