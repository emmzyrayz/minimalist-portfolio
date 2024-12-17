"use client";
// import {useRef} from "react";v
import html2pdf, {Options} from "html2pdf.js";
import { LuDownload } from "react-icons/lu";

export const PDFDownloadButton = ({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
}) => {
   const generatePDF = () => {
     // Add a delay to ensure animations complete
     setTimeout(() => {
       const element = contentRef.current;
       if (element) {
         const options: Options = {
           margin: 0.5,
           filename: "portfolio.pdf",
           image: {
             type: "jpeg",
             quality: 0.98,
           },
           html2canvas: {
             scale: 2,
             useCORS: true,
             allowTaint: true,
             logging: false,
             scrollX: 0,
             scrollY: -window.scrollY,
             backgroundColor: "#ffffff", // Ensure clean background
           },
           jsPDF: {
             unit: "in",
             format: "letter",
             orientation: "portrait",
           },
         };

         html2pdf().from(element).set(options).save();
       }
     }, 1000); // 1000ms (1 second) delay
   };

  return (
    <button
      onClick={generatePDF}
      className="navbar_resume md:flex hidden flex-row gap-3 lg:p-3 md:p-2 items-center justify-center font-sora text-md font-semibold bg-[--black] text-[--white] rounded cursor-pointer hover:bg-[--white] hover:text-[--black] border-[1px] hover:border-[--black] transition-all duration-300 ease-in-out"
    >
      <div className="text">Resume</div>
      <div className="icon text-[16px]">
        <LuDownload />
      </div>
    </button>
  );
};
