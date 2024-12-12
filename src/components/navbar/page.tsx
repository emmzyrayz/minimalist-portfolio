import Link from "next/link";
import {LuDownload} from "react-icons/lu";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="Navbar_section flex flex-row lg:p-5 md:p-2 gap-3 w-full items-center justify-between">
      <div className="navbar_icon  flex items-center justify-center">
        <span className=" font-extrabold font-sora lg:text-2xl md:text-lg transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
          Nnamdi Emmanuel Dike
        </span>
      </div>

      <div className="navbar_btn flex flex-row md:p-1 lg:gap-7 md:gap-3 items-center justify-center font-sora lg:text-xl md:text-lg font-semibold ">
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

      <div className="navbar_resume flex-row gap-3 lg:p-3 md:p-2 items-center justify-center font-sora text-md font-semibold bg-[--black] text-[--white] rounded cursor-pointer hover:bg-[--white] hover:text-[--black] border-[1px] hover:border-[--black] transition-all duration-300 ease-in-out">
        <div className="resume-btn flex flex-row gap-1 items-center justify-center">
          <div className="text">Resume</div>
          <div className="icon text-[16px]">
            <LuDownload />
          </div>
        </div>
      </div>
    </div>
  );
};
