"use client";
import {useEffect, useRef, useState} from "react";
import "./show.css";
import {FaFacebook, FaReddit, FaTwitter, FaDiscord} from "react-icons/fa";
// import Image from "next/image";
import ShowSVGComponent from "@/assets/icons/showicon";
// import showcon from "@/assets/icons/show-icon.svg";
import Link from "next/link";

export const Show = () => {
  // const {isShowVisible, setShowVisibility} = useScrollVisibility();
  // const showRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         // Trigger visibility when at least 10% of the component is in view
  //         if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
  //           setShowVisibility(true);
  //         }
  //         // Hide when less than 30% is in view
  //         else if (!entry.isIntersecting || entry.intersectionRatio <= 0.3) {
  //           setShowVisibility(false);
  //         }
  //       });
  //     },
  //     {
  //       threshold: [0.1, 0.3], // Trigger at 10% and 30% intersection
  //     }
  //   );

  //   // Start observing the component
  //   if (showRef.current) {
  //     observer.observe(showRef.current);
  //   }

  //   // Cleanup
  //   return () => {
  //     if (showRef.current) {
  //       observer.unobserve(showRef.current);
  //     }
  //   };
  // }, [setShowVisibility]); // Empty dependency array means this runs once on mount

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    },
    {threshold: 0.1} // Trigger when 10% of the component is visible
  );

  const currentSkillRef = skillRef.current; 

  if (currentSkillRef) {
    observer.observe(currentSkillRef);
  }

  return () => {
    if (currentSkillRef) {
      observer.unobserve(currentSkillRef);
    }
  };
}, []);

  return (
    <div
      ref={skillRef}
      className="show_section flex md:flex-row flex-col-reverse relative w-[98vw] lg:h-[80vh] md:p-3 p-3 lg:top-5 items-center justify-center overflow-hidden font-sora md:gap-0 gap-5"
    >
      <div
        className={`show_text flex flex-col relative lg:mt-[15%] md:mt-[7%] lg:-left-0 md:-left-16 md:w-[80%] w-full p-3 h-full lg:p-5 md:p-3 lg:gap-5 md:gap-3 gap-3 `}
      >
        <div
          className={`text_head ${
            isVisible ? "slide-in-left delay-0" : "slide-out-left"
          }`}
        >
          <span className="text-[--black] text-[32px] md:text-[40px] lg:text-[68px]">
            Hello I&apos;m{" "}
            <b className="md:font-bold lg:font-extrabold">
              Nnamdi Dike. <br /> Frontend{" "}
              <span className="font-outline-2 text-[--white]">Developer</span>
            </b>{" "}
            <br /> Based in{" "}
            <b className="md:font-bold lg:font-extrabold">Nigeria</b>
          </span>
        </div>
        <div
          className={`text-body text-[--zinc-5] font-sora font-normal lg:text-[16px] md:text-[12px] ${
            isVisible ? "slide-in-left" : "slide-out-left"
          }`}
        >
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            adipisci ad sequi, <br /> quas exercitationem nam ullam deserunt a
            excepturi veniam odio placeat saepe, <br /> doloribus tempora
            obcaecati omnis? Officiis, odio cum.
          </span>
        </div>
        <div
          className={`social_icons flex flex-row items-center md:justify-start justify-center w-full h-full relative gap-4 lg:ml-20 ${
            isVisible ? "slide-in-left delay-5" : "slide-out-left"
          }`}
        >
          <Link
            href="#"
            className={`flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] w-[40px] h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out ${
              isVisible ? "slide-in-left delay-4" : "slide-out-left"
            }`}
          >
            <FaFacebook />
          </Link>
          <Link
            href="#"
            className={`flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] w-[40px] h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out ${
              isVisible ? "slide-in-left delay-3" : "slide-out-left"
            }`}
          >
            <FaReddit />
          </Link>
          <Link
            href="#"
            className={`flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] w-[40px] h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out ${
              isVisible ? "slide-in-left delay-2" : "slide-out-left"
            }`}
          >
            <FaTwitter />
          </Link>
          <Link
            href="#"
            className={`flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] w-[40px] h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out ${
              isVisible ? "slide-in-left delay-1" : "slide-out-left"
            }`}
          >
            <FaDiscord />
          </Link>
        </div>
      </div>
      <ShowSVGComponent
        primaryColor="white"
        secondaryColor="black"
        strokeColor="black"
        width="100%"
        height="96%"
        className={`md:absolute relative lg:w-[90%] lg:h-[90%] md:w-[80%] md:h-[70%] lg:-right-32 md:-right-28 md:top-20 lg:top-5 -z-10 ${
          isVisible ? "slide-in-right" : "slide-out-right"
        }`}
      />
    </div>
  );
};
