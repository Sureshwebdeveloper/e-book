import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="grid font-popins w-full space-y-8 pb-6 md:pb-0 mx-auto bg-slate-200">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center justify-center space-y-9 w-full mx-auto  ">
        <div className="pt-6">
          <h2 className="font-black">Company</h2>
          <p>About</p>
          <p>Careers</p>
          <p>Brand Center</p>
          <p>Blog</p>
        </div>
        <div className="">
          <h2 className="font-black">Help Center</h2>
          <h2>Discord Server</h2>
          <h2>Twitter</h2>
          <h2>Facebook</h2>
          <h2>Contact Us</h2>
        </div>
        <div className="ml-6 md:ml-0">
          <h2 className="font-black">Legal</h2>
          <p>Privacy Policy</p>
          <p>Licensing</p>
          <p>Terms & Condions</p>
          <p>Legal Notice</p>
        </div>
        <div className="">
          <h2 className="font-black">Download</h2>
          <p>Ios</p>
          <p>Andriod</p>
          <p>Windows</p>
          <p>MacOS</p>
        </div>
      </div>
      <div className="flex justify-around py-5 items-center bg-slate-300">
        <div>
          <h2>
            CopyRight @ {year} <b>E-Book</b>
          </h2>
        </div>
        <div className="flex space-x-4 text-xl">
          <a  target="_blank" href="https://github.com/Sureshwebdeveloper">
            <FaGithub />
          </a>
          <a  target="_blank" href="https://www.linkedin.com/in/suresh-mern-developer">
          <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
