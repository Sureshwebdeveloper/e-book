import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import error from "../../public/notfound.svg";
const Notfound = () => {
  const { data } = useParams();
  const navigate = useNavigate()
  return (
    <div className="bg-[#c58a4a] h-screen">
      <div className="flex items-center flex-col h-screen justify-center ">
        <img src={error} alt="" className="lg:max-h-[80%]"/>
        <div className="flex items-center justify-center font-mono font-bold text-xl flex-wrap mx-10">
        Notdata Matched <b className="bg-white px-5 rounded-md ml-6">{data}</b> 
        </div>
        <button className="mt-4 py-2 px-8 rounded-xl shadow-xl text-white bg-gray-900" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default Notfound;
