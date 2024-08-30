import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
const Cart = () => {
  const { data, url, cartItem, removeFromCart, getTotalAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="pt-32">
      {getTotalAmount() === 0 ? (
        <div className="mx-auto  w-full">
          <div className="flex justify-center items-center h-[28vh] md:h-[50vh]">
            No Cart Item Available
          </div>
        </div>
      ) : (
        <div className="custom-grid-sm md:custom-grid bg-slate-800 text-white">
          <b>Images</b>
          <b className="">Name</b>
          <b>Price</b>
          <p>Quantity</p>
          <b>Total</b>
          <b>Remove</b>
        </div>
      )}

      {data.map((data, index) => {
        if (cartItem[data._id] > 0) {
          return (
            <div key={data._id}>
              <div className="custom-grid-sm md:custom-grid">
                <img
                  className="max-w-[40px] lg:max-w-[80px]"
                  src={`${url}/images/` + data.image}
                />
                <p className="max-w-[200px] md:max-w-[250px] lg:max-w-[400px] overflow-ellipsis">
                  {data.bookTitle}
                </p>
                <p>{data.price}</p>
                    <p>{cartItem[data._id]}</p>
                <p>{data.price * cartItem[data._id]}</p>
                <p onClick={() => removeFromCart(data._id)}>
                  <IoMdClose className="text-base cursor-pointer font-white" />
                </p>
              </div>
            </div>
          );
        }
      })}

      {getTotalAmount() === 0 ? (
        <></>
      ) : (
        <div className="mx-auto w-[90vw] pt-8 pb-5">
          <div className="flex flex-col space-y-3">
            <div className=" flex items-center justify-between">
              <p className="">Subtotal</p>
              <p className="mr-5">Rs {" "} {getTotalAmount()}</p>
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
              className=" bg-orange-600 font-semibold text-base text-white py-2 rounded max-w-[250px] uppercase"
              onClick={() => navigate("/order")}
            >
              Proceed To CheckOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
