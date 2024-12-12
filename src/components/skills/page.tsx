'use client'
import React, { useState } from 'react';
import {IconType} from "react-icons";
import './skills.css';
import {FaGitAlt, FaJs, FaSass, FaGithub, FaNodeJs, FaReact, } from "react-icons/fa";
import {SiNestjs, SiMongodb} from "react-icons/si";
import {RiNextjsFill, RiTailwindCssFill} from "react-icons/ri";

// Define a type for the skill structure
type Skill = {
  icon: IconType;  // Use IconType for icon components
  name: string;    // Skill name as string
  proficiency: number; // Proficiency as a number (0-100)
};

// Create the skills array with proper typing
const skillsData: Skill[] = [
  { icon: FaGitAlt, name: 'Git', proficiency: 85 },
  { icon: FaJs, name: 'Javascript', proficiency: 90 },
  { icon: FaSass, name: 'Sass/Scss', proficiency: 75 },
  { icon: SiNestjs, name: 'NestJs', proficiency: 70 },
  { icon: RiTailwindCssFill, name: 'Tailwind CSS', proficiency: 80 },
  { icon: RiNextjsFill, name: 'NextJs', proficiency: 75 },
  { icon: FaGithub, name: 'GitHub', proficiency: 85 },
  { icon: FaReact, name: 'ReactJs', proficiency: 90 },
  { icon: FaNodeJs, name: 'NodeJs', proficiency: 80 },
  { icon: SiMongodb, name: 'MongoDB', proficiency: 70 },
];

// Define props type for SkillBlock component
type SkillBlockProps = {
  icon: IconType;
  name: string;
  proficiency: number;
};

// SkillBlock component with explicit typing
const SkillBlock: React.FC<SkillBlockProps> = ({ icon: Icon, name, proficiency }) => {
  const [isHovered, setIsHovered] = useState(false);

  
  return (
    <div
      className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden group h-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0} // Make focusable
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Skill Icon */}
        <Icon className="text-4xl mb-2 text-gray-700 z-30 transition-transform group-hover:scale-110" />

        {/* Skill Name */}
        <p className="text-sm font-medium text-gray-800 z-30">{name}</p>

        {/* Proficiency Percentage */}
        {isHovered && (
          <div className="absolute bottom-2 text-xs font-bold text-gray-700 z-30">
            {proficiency}%
          </div>
        )}

        {/* Proficiency Fill Animation */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[--zinc-3] transition-all duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height: isHovered ? `${proficiency}%` : "0%",
          }}
        />
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <div className="skill_section font-sora flex flex-col w-full h-full px-[5%] py-[2%] mt-9">
      <div className="text-4xl font-medium text-center mb-10 text-[--black] font-sora flex flex-row justify-center gap-2">
        MY <span className="font-extrabold">SKILLS</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skillsData.map((skill, index) => (
          <SkillBlock
            key={index}
            icon={skill.icon}
            name={skill.name}
            proficiency={skill.proficiency}
          />
        ))}
      </div>
    </div>
  );
};

