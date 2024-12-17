"use client";
import {LuDownload} from "react-icons/lu";

export const PDFDownloadButton = () => {
    const handlePrint = () => {
      window.print(); // Trigger the browser's print dialog
    };


  return (
    <button
      onClick={handlePrint}
      className="navbar_resume md:flex hidden flex-row gap-3 lg:p-3 md:p-2 items-center justify-center font-sora text-md font-semibold bg-[--black] text-[--white] rounded cursor-pointer hover:bg-[--white] hover:text-[--black] border-[1px] hover:border-[--black] transition-all duration-300 ease-in-out"
    >
      <div className="text">Resume</div>
      <div className="icon text-[16px]">
        <LuDownload />
      </div>
    </button>
  );
};
