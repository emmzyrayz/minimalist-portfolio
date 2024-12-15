'use client'
import React, { useState } from 'react';
import './exp.css';
import { IconType } from 'react-icons';
import {FcGoogle} from "react-icons/fc";
import {YoutubeIcons} from "@/assets/icons/youtube";
import {AppleIcons} from "@/assets/icons/apple";


// Define a type for the Exp structure
type Exp = {
  icon: IconType | React.FC<React.SVGProps<SVGSVGElement>>; // Allow both IconType and SVG components
  name: string;
  color: string;
  date: string;
};

// Create the Exp array with proper typing
const expData: Exp[] = [
  {
    icon: FcGoogle,
    name: "Lead Software Engineer at Google",
    color: "inherit",
    date: "Nov 2019 - Present",
  },
  {
    icon: YoutubeIcons,
    name: "Software Engineer at Youtube",
    color: "red",
    date: "Jan 2017 - Oct 2019",
  },
  {
    icon: AppleIcons,
    name: "Junior Software Engineer at Apple",
    color: "black",
    date: "Jan 2016 - Dec 2017",
  },
];

// Define props type for SkillBlock component
type ExpTabProps = {
  icon: IconType | React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  color: string;
  date: string;
};

// SkillBlock component with explicit typing
const ExpTab: React.FC<ExpTabProps> = ({icon: Icon, name, color, date}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex bg-gray-400/40 rounded-lg shadow-md overflow-hidden group h-full w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0} // Make focusable
    >
      <div className=" md:inset-0 flex flex-col items-center justify-center w-full p-2 gap-3">
        <div className="exp-tab-top flex flex-row items-center md:justify-between justify-center gap-2 h-full w-full z-30">
          <div className="exp flex flex-row items-center md:justify-between justify-center md:gap-3 gap-1">
            {/*Exp Icon */}
            {/* If Icon is a function component (like FcGoogle or SVG component) */}
            {typeof Icon === "function" && (
              <Icon className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-7 h-7 text-[--white] z-30 transition-transform group-hover:scale-110" />
            )}

            {/* Exp Name */}
            <p className="lg:text-xl md:text-lg md:font-semibold text-[12px] font-medium text-[--white] z-30">
              {name}
            </p>
          </div>

          {/* Exp Date */}
          <div className="exp-date md:text-sm md:font-normal text-[11px] font-light">
            <span>{date}</span>
          </div>
        </div>
        <div className="exp-desc lg:text-[18px] md:text-sm font-light text-[12px] z-30">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            veniam corporis veritatis blanditiis nesciunt a voluptatem rerum
            velit rem labore deleniti ex atque, quae esse, ad quasi fugiat
            voluptatum id quos quibusdam aspernatur. Molestias corporis
            deserunt, corrupti enim illo provident quae. Assumenda at velit esse
            id quidem, incidunt quia quo. Illo omnis in accusamus eaque nulla
            quo ad obcaecati reprehenderit.
          </span>
        </div>
        {/* Proficiency Fill Animation */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[--zinc-5] transition-all duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height: isHovered ? "100%" : "0%",
          }}
        />
      </div>
    </div>
  );
};


export const Experience = () => {
    return (
      <div className="exp_section bg-[--black] text-[--white] font-sora flex flex-col w-full h-full px-[10%] py-[5%] mt-9 rounded">
        <div className="exp_head text-4xl font-medium text-center mb-10 text-[--white] font-sora flex flex-row justify-center gap-2">
          My <span className="font-extrabold">Experience</span>
        </div>
        <div className="exp-con flex flex-col gap-2">
          {expData.map((skill, index) => (
            <ExpTab
              key={index}
              icon={skill.icon}
              name={skill.name}
              color={skill.color}
              date={skill.date}
            />
          ))}
        </div>
      </div>
    );
}