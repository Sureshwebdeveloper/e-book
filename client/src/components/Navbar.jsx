import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSecretBook } from "react-icons/gi";
import { CgMenu } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { StoreContext } from "../context/Context";
import { FaCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";


const Navbar = () => {
  const { getTotalAmount, setToken } = useContext(StoreContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [logout, setLogout] = useState(true);

  //   toogle Menu
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleLogoutBtn = () => {
    setLogout(!logout);
  };

  const handleLogout = () => {
    localStorage.clear("token");
    window.location.reload();
    setToken("");
  };

  window.addEventListener("scroll", handleScroll);

    useEffect(() => {
      handleScroll();
    }, []);

  const navItems = [
    {
      link: "Home",
      path: "/",
    },
    {
      link: "Shop",
      path: "/shop",
    },
    {
      link: "Orders",
      path: "/myorders",
    },
  ];

  return (
    <div>
      <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-20">
        <nav
          className={`py-4 lg:24 px-4 ${
            isSticky
              ? "sticky top-0 left-0 right-0 drop-shadow-md bg-[#ffffff] z-0"
              : ""
          }`}
        >
          <div className="flex justify-around items-center gap-8">
            <Link
              to={"/"}
              className="text-2xl font-bold text-[#1810fffa] items-center gap-2"
            >
              <GiSecretBook className="inline-block" />
              <b>E-Book</b>
            </Link>

            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => {
                return (
                  <Link
                    key={path}
                    to={path}
                    className="block text-base text-black uppercase cursor-pointer hover:text-[#1810fffa] font-semibold"
                  >
                    {link}
                  </Link>
                );
              })}
            </ul>

            {/* <div className="space-x-12 hidden lg:flex items-center">
              <button className="w-4 text-xl hover:text-[#1810fffa]">
                <CgMenu />
              </button>
            </div> */}
            <div className="flex items-center justify-center space-x-3">
              <Link to={"/cart"}>
                <BiCart className="text-2xl  cursor-pointer relative" />
                {getTotalAmount() === 0 ? (
                  ""
                ) : (
                  <b className="text-5xl absolute -top-[10px] ml-3  font-black text-red-600">
                    .
                  </b>
                )}
              </Link>

              <FaCircleUser
                className="text-2xl cursor-pointer"
                onClick={handleLogoutBtn}
              />
              
              {!logout ? (
                <MdLogout
                  className="text-xl cursor-pointer"
                  onClick={handleLogout}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div
            className="md:hidden absolute right-3 top-5"
            onClick={handleMenu}
          >
            <button>
              {isMenuOpen ? (
                <IoCloseSharp className=" size-5 text-black" />
              ) : (
                <CgMenu className=" size-5 text-black" />
              )}
            </button>
          </div>

          <div
            className={`space-y-4 px-4 mt-16 py-7 text-center bg-blue-400 ${
              isMenuOpen
                ? "block fixed top-0 right-0 left-0 lg:hidden"
                : "hidden"
            }`}
          >
            {navItems.map(({ link, path }) => {
              return (
                <Link
                  key={path}
                  to={path}
                  className="block text-base text-black uppercase cursor-pointer hover:text-[#1810fffa] font-semibold"
                >
                  <ul onClick={() => setMenuOpen(false)}>{link}</ul>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
