import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Context";
import axios from "axios";
import { FaBook } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa6";

const MyOrders = () => {
  const { url, token, loading, setLoading } = useContext(StoreContext);
  const [orders, setMyOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    
    const response = await axios.post(
      `${url}/order/userorders`,
      {},
      { headers: { token } }
    );
    
    try {
      if (response.data.success) {
        setMyOrders(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
          <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
        </div>
      ) : (
        <div id="my-orders" className="my-[50px] py-20 mx-auto max-w-[85%]">
          <h2 className="text-center font-bold text-xl">My Orders</h2>
          {orders.length > 0 ? (
            <div id="container" className="flex flex-col  gap-5 mt-7">
              {orders.map((order, index) => {
                return (
                  <div
                    key={index}
                    id="my-orders-order"
                    className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr`] items-center gap-[30px] text-base py-[10px] px-5 border border-[#7687]"
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex space-x-3 md:m-0">
                        <FaBook className=" text-2xl text-[#000000] w-[50px]" />
                        <p>
                          {order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                              return item.bookTitle + " x " + item.quantity;
                            } else {
                              return (
                                item.bookTitle + " x " + item.quantity + ", "
                              );
                            }
                          })}
                        </p>
                      </div>
                      <p>Rs {order.amount}.00</p>
                      <p>Items: {order.items.length}</p>
                      <div className="flex items-center">
                        <p className="flex items-center">Payment Status :</p>
                        {order.payment === true ? (
                          <>
                            <FaMoneyCheck className="ml-3 text-green-600" /> :{" "}
                            <b className="ml-3">Paid</b>{" "}
                          </>
                        ) : (
                          <b>Not Paid</b>
                        )}
                      </div>
                      <p>
                        <span className="text-red-600 text-xl">&#x25cf;</span>{" "}
                        <b className="text-[#000000db]">{order.status}</b>
                      </p>
                      <button
                        className="bg-[#000000] py-2 text-white"
                        onClick={() => fetchOrders()}
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto h-[17vh]">
              <h1 className="text-center my-14">No Orders Found</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrders;
