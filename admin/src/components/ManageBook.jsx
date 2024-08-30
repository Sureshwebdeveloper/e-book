import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/DataContext";
import axios from "axios";
import { IoIosCloudDone } from "react-icons/io";
import { PiCloudXFill } from "react-icons/pi";
import { PiPencil } from "react-icons/pi";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "./Loader";

const ManageBookjsx = () => {
  const { url, update, setUpdate, data, fetchData , loading,setLoading} = useContext(StoreContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;

  const currentPost = data.slice(firstPost, lastPost);
  const totalPost = data.length;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  const navigate = useNavigate();
  const { id } = useSearchParams();
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

  const removeBook = async (bookId) => {
    setLoading(true)
    const response = await axios.post(`${url}/remove-book`, { id: bookId });
    await fetchData();
    if (response.data.success) {
      setLoading(false)
      toast.success(response.data.message);
    } else {
      setLoading(false)
      toast.error("Error");
    }
  };

  const updateBook = async (bookId) => {
    await setUpdate(bookId);
    navigate(`/update/${bookId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {loading ? <Loader/> : (
    <div className="lg:mx-[5vw] lg:mb-[4vh] min-h-screen pb-11 md:pb-0 text-base">
      <h1 className="text-center pt-[100px] font-bold font-sans text-3xl ml-3">
        Manage Book
      </h1>

      <div className="pt-8">
        {data.length < 1 ? (
          <h3 className="ml-4">No Data Available</h3>
        ) : (
          // <div className="custom-grid-sm md:custom-grid bg-slate-800 text-white">
          <div className="grid grid-cols-4 py-3 mx-3 place-items-center md:grid-cols-6 rounded-t-md bg-slate-800 text-white">
            <b>Images</b>
            <b>Name</b>
            <b>Category</b>
            <b className="hidden md:block">Price</b>
            <b className="hidden md:block">Pdf </b>
            <b>Action</b>
          </div>
        )}

        {currentPost.map((data, index) => {
          return (
            <div key={data._id}>
              {/* <div className="custom-grid-sm md:custom-grid"> */}
              <div className="grid grid-cols-4  md:grid-cols-6  py-4  shadow-lg border-x-2 border-y-[#1b1b1b91] border-x-[#1311116c] border-y-[1px] mx-3 place-items-center ">
                <img
                  className="max-w-[60px] rounded-t-md"
                  src={`${url}/images/` + data.image}
                />
                <p className="max-w-[100px] lg:max-w-[full] text-ellipsis overflow-hidden">
                  {data.bookTitle}
                </p>
                <p className="text-ellipsis overflow-hidden">{data.category}</p>
                <p className="hidden md:block">{data.price}</p>
                <div className="hidden md:block">
                  {data.pdf ? (
                    <IoIosCloudDone className="text-green-600 text-base" />
                  ) : (
                    <PiCloudXFill className="text-red-600 text-base" />
                  )}
                </div>

                <div className="flex justify-around w-full items-center">
                  <p
                    className=" text-[18px] font-medium cursor-pointer"
                    onClick={() => removeBook(data._id)}
                  >
                    x
                  </p>
                  <p className="pt-1 ">
                    <PiPencil
                      className="text-[18px] cursor-pointer"
                      onClick={() => updateBook(data._id)}
                    />
                  </p>
                </div>
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
    </div>)}
    </>
  );
};

export default ManageBookjsx;
