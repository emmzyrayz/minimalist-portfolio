"use client";
import {useEffect, useRef, useState} from "react";
import "./show.css";
import {FaFacebook, FaReddit, FaTwitter, FaLinkedin} from "react-icons/fa";
import ShowSVGComponent from "@/assets/icons/showicon";
import Link from "next/link";
import {IconType} from "react-icons";

// Define the type for social platform props
interface SocialPlatform {
  name: string;
  icon: IconType;
  url: string;
}

// Update the component to accept props
interface ShowProps {
  name?: string;
  title?: string;
  subtitle?: string;
  location?: string;
  description?: string;
  socialPlatforms?: SocialPlatform[];
}

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/Nnamdidike0029",
  },
  {
    name: "Reddit",
    icon: FaReddit,
    url: "https://www.reddit.com/u/okeyinterrupt",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://www.x.com/okayinterrupt",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/nnamdi-dike-604522281",
  },
];

export const Show = ({
  name = "Emmanuel",
  title = "Frontend",
  subtitle= "Developer",
  location= "Nigeria",
  description = "a skilled web developer specializing in building dynamic, <br /> user-focused websites and applications with expertise in modern technologies <br /> like React, Next.js, and Tailwind CSS. Passionate about innovation and problem-solving, <br /> I strive to deliver efficient and scalable digital solutions.",
  socialPlatforms = socialLinks, // Default to an empty array if not provided
}: ShowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement | null>(null);

  
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
      className="show_section flex md:flex-row flex-col-reverse relative w-full lg:h-[100vh] md:p-3 p-3 lg:top-5 items-center justify-center overflow-hidden font-sora md:gap-0 gap-3"
    >
      <div
        className={`show_text flex flex-col relative lg:-left-0 md:-left-16 md:w-1/2 w-full p-3 h-full lg:p-3 lg:gap-3 gap-1 `}
      >
        <div
          className={`text_head ${
            isVisible ? "slide-in-left delay-0" : "slide-out-left"
          }`}
        >
          <span className="text-[--black] text-[28px] md:text-[32px] lg:text-[48px]">
            Hello I&apos;m{" "}
            <b className="md:font-bold lg:font-extrabold">
              {name}. <br /> {title}{" "}
              <span className="font-outline-2 text-[--white]">{subtitle}</span>
            </b>{" "}
            <br /> Based in{" "}
            <b className="md:font-bold lg:font-extrabold">{location}</b>
          </span>
        </div>
        <div
          className={`text-body text-[--zinc-5] font-sora font-normal lg:text-[16px] md:text-[12px] ${
            isVisible ? "slide-in-left" : "slide-out-left"
          }`}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: description, //.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
            }}
          />
        </div>
        <div
          className={`flex flex-col-reverse social_icons items-center md:justify-start justify-center w-full h-full relative gap-4 pb-[150px] ml-5 ${
            isVisible ? "slide-in-left delay-5" : "slide-out-left"
          }`}
        >
          <div
            className={`flex flex-row social_icons items-center md:justify-start justify-center w-full h-full relative gap-4 ml-5  ${
              isVisible ? "slide-in-left delay-5" : "slide-out-left"
            }`}
          >
            {socialPlatforms.map((platform, index) => (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] w-[40px] h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out ${
                  isVisible
                    ? `slide-in-left delay-${4 - index}`
                    : "slide-out-left"
                }`}
                aria-label={`${platform.name} profile`}
              >
                <platform.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`flex md:w-1/2 w-full h-full items-center justify-center   z-10 ${
          isVisible ? "slide-in-right" : "slide-out-right"
        }`}
      >
        <ShowSVGComponent
          primaryColor="white"
          secondaryColor="black"
          strokeColor="black"
          width={{
            default: "100%",
            sm: "50%",
            md: "150%",
            lg: "130%",
            xl: "140%",
          }}
          height={{
            default: "auto",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          }}
          lineWidth={800}
          className={`md:absolute right-0 relative z-10 ${
            isVisible ? "slide-in-right" : "slide-out-right"
          }`}
        />
      </div>
    </div>
  );
};