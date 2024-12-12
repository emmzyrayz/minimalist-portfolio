import './show.css';
import {FaFacebook, FaReddit, FaTwitter, FaDiscord} from "react-icons/fa";
import Image from 'next/image';
import ShowSVGComponent from '@/assets/icons/showicon';
import showcon from '@/assets/icons/show-icon.svg'
import Link from 'next/link';

export const Show = () => {
    return (
      <div className="show_section flex flex-row relative w-[98vw] lg:h-[80vh] p-3 lg:top-5 items-center justify-center overflow-hidden font-sora">
        <div className="show_text flex flex-col relative lg:mt-[15%] md:mt-[7%] lg:-left-0 md:-left-16 lg:w-[80%] md:w-[80%] h-full lg:p-5 md:p-3 lg:gap-16 md:gap-3">
          <div className="text_head ">
            <span className="text-[--black] md:text-[40px] lg:text-[68px]">
              Hello i'am{" "}
              <b className="md:font-bold lg:font-extrabold">
                Nnamdi Dike. <br /> Frontend{" "}
                <span className="font-outline-2 text-[--white]">Developer</span>
              </b>{" "}
              <br /> Based in{" "}
              <b className="md:font-bold lg:font-extrabold">Nigeria</b>
            </span>
          </div>
          <div className="text-body text-[--zinc-5] font-sora font-normal lg:text-[16px] md:text-[12px]">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              adipisci ad sequi, <br /> quas exercitationem nam ullam deserunt a
              excepturi veniam odio placeat saepe, <br /> doloribus tempora
              obcaecati omnis? Officiis, odio cum.
            </span>
          </div>
          <div className="social_icons flex flex-row relative gap-4 lg:ml-20">
            <Link
              href="#"
              className="flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out"
            >
              <FaFacebook />
            </Link>
            <Link
              href="#"
              className="flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out"
            >
              <FaReddit />
            </Link>
            <Link
              href="#"
              className="flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out"
            >
              <FaTwitter />
            </Link>
            <Link
              href="#"
              className="flex lg:w-[68px] lg:h-[68px] md:w-[56px] md:h-[56px] items-center justify-center border-[2px] border-[--black] lg:text-[32px] md:text-[24px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--white] transition-all duration-300 ease-in-out"
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
          className="absolute lg:w-[90%] lg:h-[90%] md:w-[80%] md:h-[70%] lg:-right-32 md:-right-28 md:top-20 lg:top-5 -z-10"
        />
      </div>
    );
};