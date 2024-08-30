import React from "react";
import book1 from "../../assets/book-1.jpg";
import book2 from "../../assets/book-2.jpg";
import book3 from "../../assets/book-3.jpg";
import book4 from "../../assets/book-4.jpg";
import book5 from "../../assets/book-5.jpg";
import book6 from "../../assets/book-6.jpg";
import book7 from "../../assets/book-7.jpg";
import { Link } from "react-router-dom";

const FavoriteBook = () => {
  const books = [book1, book2, book3, book4, book5, book6];
  return (
    <div className="grid gap-y-5 md:gap-0 grid-cols-1 py-8 md:grid-cols-2  px-5 bg-[#191919]">
      <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-3 gap-3 bg-white rounded-lg p-4 mx-auto">
        {books.map((item, index) => {
          return (
            <div className="space-y-3" key={index}>
              <img
                src={item}
                alt=""
                className="w-[180px] h-[220px] rounded-md"
              />
            </div>
          );
        })}
      </div>
      <article className="text-2xl my-auto text-center md:text-3xl font-bold leading-snug text-black">
        <h1 className="text-[#ff5500f0] font-extrabold">
          Find Your Favorite <span className="">Book Here!</span>
        </h1>
        <p className="lg:max-w-[450px]  text-center mx-auto py-2 leading-snug text-[#ffffff] font-cabin text-xl font-bold ">
        "Find your favorite books effortlessly, whether it's a thrilling mystery, a heartwarming romance, or an enlightening non-fiction. Dive into captivating stories and expand your literary horizons with E-Book!"
        </p>
        <div className="flex flex-row items-center justify-center space-x-4 lg:space-x-6 mx-auto w-10/12 text-xl">
          <div>
            <p className="text-[#ff6a1ff0] ">500+</p>
            <p className="text-white">Book Listing</p>
          </div>
          <div>
            <p className="text-[#ff6a1ff0] ">1000+</p>
            <p className="text-white">Register Users</p>
          </div>
          <div>
            <p className="text-[#ff6a1ff0] ">2000+</p>
            <p className="text-white">PDF Downloads</p>
          </div>
        </div>
        <Link to={"/shop"}>
        <div className="pt-3">
        <button className="bg-white hover:bg-black hover:text-white transition-all ease-linear duration-500 px-4  rounded-md text-base py-2">Explore More</button>
        </div>
        </Link>
      </article>
    </div>
  );
};

export default FavoriteBook;
