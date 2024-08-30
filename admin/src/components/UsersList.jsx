import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState,useRef } from "react";
import { StoreContext } from "../context/DataContext";
import { GrUserAdmin } from "react-icons/gr";
import { GrUser } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";

const UsersList = () => {
  // http://localhost:2000/api/user/userList
  const { url,loading,setLoading } = useContext(StoreContext);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);


  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPost = userList.slice(firstPostIndex, lastPostIndex);
  const totalPost = userList.length;

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  const fetchAllUsers = async () => {
    setLoading(true)
    const response = await axios.get(`${url}/admin/users`);
    if (response.data.success) {
      setLoading(false)
      setUserList(response.data.user);
    } else {
      setLoading(false)
      toast.error("Error");
    }
  };

  const removeUser = async ( id) => {
    const response = await axios.post(`${url}/admin/remove`, { _id: id });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllUsers();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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

  const handleRole = async (e,id) => {
    try {
      const response = await axios.post(`${url}/admin/update-role`, {
        _id:id,
        isAdmin:e.target.value,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllUsers();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <> {loading ? <Loader/> : (
    <div className="lg:mx-[5vw] lg:mb-[4vh] min-h-screen py-11 md:pb-0 text-base mx-5">
      <h1 className="text-center pt-20 font-bold font-sans text-3xl">
        UsersList
      </h1>

      <div className="ml-2 py-2 flex">
        <div className="flex items-center space-x-2 mx-auto">
          <div className="size-6 rounded-md  bg-green-500  drop-shadow border-[1px]">
            <p className="w-full pt-[3px] pl-[6px]">
              <GrUserAdmin />
            </p>
          </div>
          <h2>For Admin</h2>
        </div>
        <p className="divide-x-4"></p>
        <div className="flex items-center space-x-2 mx-auto">
          <div className="size-6 rounded-md  bg-white drop-shadow border-[1px] border-black">
            <p className="w-full pt-[3px] pl-[3px]">
              <GrUser />
            </p>
          </div>
          <h2>For User</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 place-items-center w-full md:w-[90vw] text-lg bg-[#f0f0f0] py-3 border-2 border-[#0000009b] rounded">
        <p className="hidden md:block md:px-3">Name</p>
        <p className="md:px-3">Email</p>
        <p className="md:px-3">Role</p>
        <p className="md:px-3">Action</p>
      </div>

      <div className=" rounded-t-md">
        {currentPost.map((user, index) => (
          <div
            key={index}
            className={`grid grid-cols-3  pl-4 md:grid-cols-4 items-center  w-full md:w-[90vw] font-semibold text-lg border-x-2 border-b-[1px]  border-[#ccc]  shadow-md ${
              user && user.isAdmin ? "bg-green-500" : "bg-[#ffffffcf]"
            } py-2`}
          >
            <p className="hidden md:block md:px-[25%] lg:pl-[35%]">
              {user.name}
            </p>
            <p className="md:px-3 truncate">{user.email}</p>
            <div className="flex items-center justify-center md:px-3">
              {user && user.isAdmin ? <GrUserAdmin /> : <GrUser />}
            </div>
            <div className="flex flex-1 mx-auto justify-end w-1/2">
           
              <div className="flex flex-[0.5]">
                <select
                  name="role"
                  id="role"
                  className="outline-none"
                  onChange={(e) => handleRole(e, user._id)}
                  value={user.isAdmin}
                >
                  <option value={false}>User</option>
                  <option value={true}>Admin</option>
                </select>
              </div>
              <div className="flex flex-[0.5]">
                <div
                  className="mx-auto   
               px-3 cursor-pointer border "
                  onClick={() => removeUser(user._id)}
                >
                  X
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default UsersList;
