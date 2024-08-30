import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import book1 from "../assets/book-1.jpg";
import { Link, useLoaderData } from "react-router-dom";

const Book = () => {
  const { url, data, fetchData, loading } = useContext(StoreContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pb-6">
      <h2 className="text-4xl py-2 font-bold leading-snug  text-black text-center">
        Trending <span className="text-blue-600 ml-3">Books</span>
      </h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center mx-auto  py-28 ">
          <div className="loader-home"></div>
          <br />
          <h1 className="text-center font-cabin font-black text-3xl">Loading....</h1>
        </div>
      ) : (
        <>
      <div className="card-trending">
        {data.map((item, index) => {
          return (
            <div key={item._id}>
              {item.trending === true ? (
                <Link to={`/about-book/${item._id}`}>
                  <div className="py-4">
                    <div className="max-w-[300px] max-h-[250px] ">
                      <img
                        src={`${url}/images/${item.image}`}
                        // src={book1}
                        className="w-[200px] h-[250px] rounded-lg"
                        alt={`${item.bookTitle}`}
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
          );
        })}

        <Link to={"/shop"}>
          <div className="flex items-center justify-center mx-auto text-4xl pt-2 font-bold leading-snug text-black text-center  md:hidden lg:flex">
            Explore More
            <span className="text-blue-600 mx-2 text-3xl mt-1 cursor-pointer">
              <FaArrowCircleRight />
            </span>
          </div>
        </Link>
      </div>
      </>)}
    </div>
  );
};

export default Book;
