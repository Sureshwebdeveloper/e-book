import React, { useEffect, useState } from "react";
import admin from "../assets/admin.webp";
import { Link } from "react-router-dom";
import { GiHamburgerMenu, GiSecretBook } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
  const [menu, setMenu] = useState(true);
  const [nav, setNav] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Manage", path: "/manage" },
    { link: "Users", path: "/users" },
    { link: "Orders", path: "/orders" },
  ];

  const handleNavbar = () => {
    if (window.scrollY > 40) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  const handleLogOut = () => {
    localStorage.clear("admin");
    window.location.reload();
    setToken("");
  };

  window.addEventListener("scroll", handleNavbar);

  useEffect(() => {
    handleNavbar();
  }, []);

  return (
    <div className="flex fixed w-full justify-between items-center top-0 left-0 right-0 z-20">
      <nav
        className={`flex justify-around items-center w-full pt-3 ${
          nav
            ? "bg-white fixed w-full justify-between items-center top-0 left-0 right-0 z-0 shadow-lg py-3"
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
        </div>

        {/* For Lg device NavItems */}
        <div className="">
          <ul className="hidden lg:flex justify-around text-black font-semibold gap-x-10">
            {navItems.map(({ link, path }) => {
              return (
                <Link key={path} to={path}>
                  <p
                    className="font-bold text-xl  hover:text-[#1810fffa]"
                    onClick={handleMenu}
                  >
                    {link}
                  </p>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-x-4">
          <img
            src={admin}
            alt=""
            className="rounded-3xl size-10 ring-2 ring-slate-50"
          />
          <MdLogout
            className="text-2xl cursor-pointer"
            onClick={handleLogOut}
          />
          {
            <div onClick={handleMenu} className="lg:hidden">
              {menu ? (
                <GiHamburgerMenu className="text-xl" />
              ) : (
                <IoCloseSharp className="text-2xl font-bold" />
              )}
            </div>
          }

          <div
            className={
              menu
                ? "hidden"
                : `lg:hidden bg-blue-400 absolute w-full top-14 left-0 text-center py-2`
            }
          >
            <ul className="flex flex-col lg:hidden  text-black font-semibold space-y-2">
              {navItems.map(({ link, path }) => {
                return (
                  <Link key={path} to={path}>
                    <p className="font-bold" onClick={handleMenu}>
                      {link}
                    </p>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
