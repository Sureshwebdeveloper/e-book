import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/Context.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
const Shop = () => {
  const { url, data, loading,fetchData} = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPost = data.slice(firstPostIndex, lastPostIndex);
  const totalPost = data.length;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalPost / postPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
       {loading ? (
        <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
          <div className="loader"></div>
        </div>
      ) : (
        <>
      <div className="card-sm md:card">
        {currentPost.map((item, index) => {
          return (
            <div className="" key={item._id}>
              <div className="">
                <Link to={`/about-book/${item._id}`}>
                  <div className="max-w-[350px] max-h-[250px] ">
                    <img
                      src={`${url}/images/${item.image}`}
                      // src={book1}
                      className="w-[200px] h-[250px]"
                      alt={`${item.bookTitle}`}
                    />
                    {item.trending === true && (
                      <p className=" relative -top-[250px] bg-[#1babff] text-white max-w-fit px-2">
                        Trending
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full mx-auto text-center space-x-4 py-8 flex flex-wrap justify-center">
        <button
          onClick={handleNextPage}
          className={"text-base font-medium px-3"}
        >
          Next
        </button>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? " bg-orange-400 text-black border border-black  px-3 py-1 rounded-full "
                  : "border border-black px-3 py-1 rounded-full "
              }
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={handlePrevPage}
          className={"text-base font-medium px-3"}
        >
          Prev
        </button>
      </div>
      </>
      )}
    </div>
  );
};

export default Shop;
