import "./project.css";
import React from "react";
import Image, { StaticImageData } from "next/image";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";
import img1 from "@/assets/img/Screenshot-2024-12-11-053050.png";
import img2 from "@/assets/img/home.png";
import img3 from "@/assets/img/newwww.png";

// types/Project.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string | StaticImageData;
  githubLink?: string;
  liveLink?: string;
}

// data/projectsData.ts
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description:
      "A comprehensive web application that solves complex problems...",
    technologies: ["React", "TypeScript", "Tailwind"],
    image: img1,
    githubLink: "https://github.com/username/project1",
    liveLink: "https://project1-live.com",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "An innovative solution that revolutionizes...",
    technologies: ["Next.js", "GraphQL", "Prisma"],
    image: img2,
    githubLink: "https://github.com/username/project2",
    liveLink: "https://project2-live.com",
  },
  // Add more projects...
];

interface ProjectCardProps extends Project {
  isEvenIndex: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  githubLink,
  liveLink,
  isEvenIndex,
}) => {
  return (
    <div
      className={`flex flex-col font-sora md:flex-row items-center 
      ${isEvenIndex ? "md:flex-row-reverse" : "md:flex-row"} 
      my-16 space-y-6 md:space-y-0 md:space-x-10`}
    >
      {/* Image Container */}
      <div
        className={`w-full md:w-1/2 relative 
        ${isEvenIndex ? "md:ml-auto" : "md:mr-auto"}
        shadow-2xl rounded-lg overflow-hidden`}
      >
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Description Container */}
      <div
        className={`w-full md:w-1/2 text-center 
        ${
          isEvenIndex ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
        } space-y-4`}
      >
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>

        <div
          className={`p-6 bg-gray-100 rounded-lg shadow-md 
          ${isEvenIndex ? "md:text-right" : "md:text-left"}`}
        >
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Technologies */}
        <div
          className={`flex flex-wrap gap-2 justify-center 
          ${isEvenIndex ? "md:justify-end" : "md:justify-start"}`}
        >
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[--black] text-[--white] px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className={`flex gap-4 mt-4 justify-center
          ${isEvenIndex ? "md:justify-end" : "md:justify-start"}`}
        >
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaGithub size={24} />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaExternalLinkAlt size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className=" font-sora text-4xl font-medium text-center mb-12">
        My <span className="text-[--black] font-extrabold">Projects</span>
      </h1>

      <div className="space-y-16">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            isEvenIndex={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};
