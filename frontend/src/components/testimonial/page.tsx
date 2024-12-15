import "./testi.css";
import React from "react";
import Image, { StaticImageData } from "next/image";
import {FaQuoteRight} from "react-icons/fa";
import BoyFace from "@/assets/icons/boyface.png";
import GirlFace from "@/assets/icons/girlfacee.png";

// Define the type for a single testimonial
interface TestimonialItem {
  image: string | StaticImageData;
  name: string;
  testimony: string;
  stack: string;
}

// Define props for the Testimonial component
interface TestimonialProps {
  testimonials: TestimonialItem[];
}

const TestimonialCard: React.FC<TestimonialProps> = ({testimonials}) => {
  return (
    <div className="testimonial_section container mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <h1 className="font-sora text-4xl font-medium text-center mb-12">
        My <span className="text-[--black] font-extrabold">Testimonial</span>
      </h1>

      <div className="testimonial-con flex flex-row w-full h-full gap-3 flex-wrap justify-center">
        {testimonials.map((testi, index) => (
          <div
            key={index}
            className="testimon-item w-80 shadow-lg hover:bg-[--black] hover:shadow-xl hover:scale-105 cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out group"
          >
            <div className="testi-img flex relative w-auto h-auto rounded-full">
              <Image
                src={testi.image}
                alt={`${testi.name} testimonial`}
                width={100}
                height={100}
                className="rounded-full"
              />
              <span className="flex absolute bottom-[2px] right-[2px] p-2 bg-[--black] text-[--white] group-hover:bg-[--white] group-hover:text-[--black] rounded-full">
                <FaQuoteRight />
              </span>
            </div>
            <div className="testi-message font-sora">
              <p className="flex items-center justify-center text-center group-hover:text-[--white]">
                {testi.testimony}
              </p>
            </div>
            <hr className="h-[3px] rounded-[12px] group-hover:bg-[--white] bg-black w-[50%] border-[--black]" />
            <div className="testi-name font-sora group-hover:text-[--white] text-[20px] font-semibold">
              <p>{testi.name}</p>
            </div>
            <div className="testi-st font-sora text-[18px] group-hover:text-[--white] font-medium opacity-60">
              <p>{testi.stack}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Testimonial = () => {
  const testimonialData = [
    {
      image: BoyFace,
      name: "Evren Shah",
      testimony:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, modi hic? Eveniet culpa laudantium pariatur vitae voluptatum.",
      stack: "Designer",
    },
    {
      image: GirlFace,
      name: "Jane Doe",
      testimony:
        "Another great testimonial that highlights the amazing work and experience.",
      stack: "Developer",
    },
    {
      image: GirlFace,
      name: "Jane Doe",
      testimony:
        "Another great testimonial that highlights the amazing work and experience.",
      stack: "Developer",
    },
    {
      image: GirlFace,
      name: "Jane Doe",
      testimony:
        "Another great testimonial that highlights the amazing work and experience.",
      stack: "Developer",
    },
    // Add more testimonials as needed
  ];
  // return (
  //   <div className="testimonial_section container mx-auto px-4 py-12 flex flex-col items-center justify-center">
  //     <h1 className=" font-sora text-4xl font-medium text-center mb-12">
  //       My <span className="text-[--black] font-extrabold">Testimonial</span>
  //     </h1>

  //     <div className="testimonial-con flex flex-row w-full h-full gap-3">
  //       <div className="testimon-item w-80 shadow-lg hover:bg-[--black] hover:shadow-xl cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out group">
  //         <div className="testi-img flex relative w-auto h-auto rounded-full">
  //           <Image
  //             src={BoyFace}
  //             alt="boy test"
  //             width={100}
  //             height={100}
  //             className=""
  //           />
  //           <span className="flex absolute bottom-[2px] right-[2px] p-2 bg-[--black] text-[--white] group-hover:bg-[--white] group-hover:text-[--black] rounded-full">
  //             <FaQuoteRight className="" />
  //           </span>
  //         </div>
  //         <div className="testi-message font-sora">
  //           <p className="flex items-center justify-center text-center group-hover:text-[--white]">
  //             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //             Repellendus, modi hic? Eveniet culpa laudantium pariatur vitae
  //             voluptatum. Fuga libero eius esse deleniti!
  //           </p>
  //         </div>
  //         <hr className="h-[3px] rounded-[12px] group-hover:bg-[--white] bg-black w-[50%] border-[--black]" />
  //         <div className="testi-name font-sora group-hover:text-[--white] text-[20px] font-semibold">
  //           <p>Evren Shah</p>
  //         </div>
  //         <div className="testi-st font-sora text-[18px] group-hover:text-[--white] font-medium opacity-60">
  //           <p>Designer</p>
  //         </div>
  //       </div>

  //       <div className="testimon-item w-80 shadow-lg hover:bg-[--black] hover:shadow-xl cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out group">
  //         <div className="testi-img flex relative w-auto h-auto rounded-full">
  //           <Image
  //             src={BoyFace}
  //             alt="boy test"
  //             width={100}
  //             height={100}
  //             className=""
  //           />
  //           <span className="flex absolute bottom-[2px] right-[2px] p-2 bg-[--black] text-[--white] group-hover:bg-[--white] group-hover:text-[--black] rounded-full">
  //             <FaQuoteRight className="" />
  //           </span>
  //         </div>
  //         <div className="testi-message font-sora">
  //           <p className="flex items-center justify-center text-center group-hover:text-[--white]">
  //             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  //             Repellendus, modi hic? Eveniet culpa laudantium pariatur vitae
  //             voluptatum. Fuga libero eius esse deleniti!
  //           </p>
  //         </div>
  //         <hr className="h-[3px] rounded-[12px] group-hover:bg-[--white] bg-black w-[50%] border-[--black]" />
  //         <div className="testi-name font-sora group-hover:text-[--white] text-[20px] font-semibold">
  //           <p>Evren Shah</p>
  //         </div>
  //         <div className="testi-st font-sora text-[18px] group-hover:text-[--white] font-medium opacity-60">
  //           <p>Designer</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return <TestimonialCard testimonials={testimonialData} />;
};
