import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/Context";
import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const SingleBook = () => {
  const styleRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const { url, data, addToCart, cartItem, removeFromCart, fetchData, loading } =
    useContext(StoreContext);

  const handleDownload = async (item) => {
    // http://localhost:7000/api/pdf/1722249169721ebook.pdf
    try {
      const response = await axios.get(`${url}/pdf/${item.pdf}`, {
        responseType: "blob",
      });
      // Create a temporary URL for the PDF blob
      const pdfurl = window.URL.createObjectURL(response.data);
      // Create a tage Element
      const a = document.createElement("a");
      // Assign to the href response of blob
      a.href = pdfurl;
      // Setting to downloding file Name
      a.download = `${item.bookTitle}_${Date.now()}`;
      // Append a A tag on body
      document.body.appendChild(a);
      a.click();
      // Remove a Element After Click
      document.body.removeChild(a);

      // Remove A temporary A tag
      window.URL.revokeObjectURL(pdfurl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHardCopy = (itemId) => {
    addToCart(itemId);
    toast.success("Book Added To Cart");
  };

  const handleScroll = () => {
    styleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
        <div className="loader"></div>
      </div>
      ) : (
        <div
          className="py-16 md:py-20 md:px-20 mx-auto grid place-content-center lg:block w-full  transition-all ease-in-out duration-100"
          ref={styleRef}
        >
          <div className=" absolute bg-[black] py-1 px-[4px] left-6 mt-10 rounded-2xl">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="relative block cursor-pointer  rounded  text-xl text-white"
            />
          </div>

          <div className="grid grid-row-2 pt-9 font-cabin">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  {item._id === params.id && (
                    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto  lg:px-24 md:space-x-8 space-y-4 place-items-center place-content-center">
                      <div>
                        <h1 className="lg:ml-28 max-w-[250px] text-xl font-semibold">
                          {item.bookTitle}
                        </h1>
                        <div className="max-w-[250px] md:max-w-[500px]">
                          <img
                            src={`${url}/images/${item.image}`}
                            className="lg:pl-28"
                          />
                        </div>
                      </div>
                      <div className=" flex flex-col md:flex-col  md:pt-6 text-xl space-y-6">
                        <p>
                          Author Name : <b>{item.authorName}</b>
                        </p>
                        <p className="max-w-[300px] overflow-ellipsis">
                          Description : <b>{item.bookDescription}</b>
                        </p>
                        <p>
                          Price : <b>{item.price}</b>
                        </p>
                        <p>
                          Category : <b>{item.category}</b>
                        </p>

                        {!cartItem[`${item._id}`] && (
                          <button
                            className="bg-[#000000] lg:w-10/12 w-full py-2 text-white px-3 my-3 rounded-md"
                            onClick={() => handleHardCopy(item._id)}
                          >
                            Add to Cart
                          </button>
                        )}

                        {cartItem[`${item._id}`] > 0 && (
                          <div className="bg-[#000000] lg:w-10/12 w-full py-2 text-white px-3 my-3 flex justify-around rounded-md">
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-600 font-black"
                            >
                              <FaMinus />
                            </button>
                            {cartItem[`${item._id}`]}
                            <button
                              onClick={() => addToCart(item._id)}
                              className="text-green-600 font-black"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        )}

                        {item && item.pdf && (
                          <button
                            className="bg-[#24ba60] lg:w-10/12 w-full py-2 text-white px-3 my-3 outline-none rounded-md"
                            onClick={() => handleDownload(item)}
                          >
                            Download Soft Copy
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="py-8">
              <h1 className="text-center font-serif text-2xl pt-5 font-semibold py-5">
                Suggested Books
              </h1>
              <div className="suggest-card md:suggest-card-md lg:suggest-card-lg">
                {data.map((item, index) => {
                  return (
                    <div
                      key={(item && item._id) || index}
                      onClick={() => handleScroll()}
                    >
                      {item.trending === true && (
                        <Link to={`/about-book/${item._id}`}>
                          <div className="py-4">
                            <div className="w-full mx-auto flex justify-center ">
                              <img
                                src={`${url}/images/${item.image}`}
                                className="max-w-[280px] max-h-[300px]"
                                alt={`${item.bookTitle}`}
                              />
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBook;
