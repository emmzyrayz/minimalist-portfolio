'use client'
import Link from "next/link";
// import {LuDownload} from "react-icons/lu";
import "./navbar.css";
import React, { useState } from "react";
import { PDFDownloadButton } from "../resume";

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

interface DropdownMenuProps {
  isOpen: boolean;
}

interface NavbarProps {
  contentRef: React.RefObject<HTMLDivElement>; // Add contentRef prop
}

export const Navbar: React.FC<NavbarProps> = ({contentRef}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Navbar_section flex flex-row lg:p-5 p-2 px-[3%] h-full gap-3 w-full items-center justify-between z-50">
      <Link href="/" className="">
        <div className="navbar_icon  flex items-center justify-center">
          <span className=" font-extrabold font-sora md:text-lg transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
            Nnamdi Emmanuel Dike
          </span>
        </div>
      </Link>

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <div className="navbar_btn md:flex hidden flex-row md:p-1 lg:gap-7 md:gap-3 items-center justify-center font-sora lg:text-xl md:text-lg font-semibold ">
        <Link
          className="hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
          href="#"
        >
          <span> About Me</span>
        </Link>

        <Link
          className="hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
          href="#"
        >
          <span>Skills</span>
        </Link>

        <Link
          className="hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
          href="#"
        >
          <span>Projects</span>
        </Link>

        <Link
          className="hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
          href="#"
        >
          <span>Contact Me</span>
        </Link>
      </div>

      <PDFDownloadButton contentRef={contentRef} />

      {/* Dropdown Menu */}
      <DropdownMenu isOpen={isOpen} />
    </div>
  );
};


const DropdownMenu: React.FC<DropdownMenuProps> = ({isOpen}) => {
  return (
    <div
      className={`absolute font-sora top-0 left-0 w-full bg-white shadow-xl transition-transform duration-300 z-50 text-[18px] font-semibold ${
        isOpen ? "translate-y-[17.5%]" : "-translate-y-full"
      }`}
    >
      <Link className="block p-4 hover:bg-gray-200 " href="#">
        About Me
      </Link>
      <Link className="block p-4 hover:bg-gray-200" href="#">
        Skills
      </Link>
      <Link className="block p-4 hover:bg-gray-200" href="#">
        Projects
      </Link>
      <Link className="block p-4 hover:bg-gray-200" href="#">
        Contact Me
      </Link>


    </div>
  );
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({isOpen, toggleMenu}) => {


  return (
    <div
      onClick={toggleMenu}
      className="cursor-pointer h-full gap-1 md:hidden flex flex-col items-center"
    >
      <div
        className={`h-1 w-8 bg-black transition-transform duration-300 rounded-md ${
          isOpen ? "rotate-45 translate-y-3" : ""
        }`}
      ></div>
      <div
        className={`h-1 w-8 bg-black transition-opacity duration-300 rounded-md ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`h-1 w-8 bg-black transition-transform duration-300 rounded-md ${
          isOpen ? "-rotate-45 -translate-y-1" : ""
        }`}
      ></div>
    </div>
  );
};