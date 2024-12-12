'use client'
import React, {useState} from "react";
import Link from 'next/link';
import './contact.css';
import {FaFacebook, FaReddit, FaTwitter, FaDiscord} from "react-icons/fa";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");


    return (
      <div className="contact-section flex flex-row container mx-auto px-4 py-12 font-sora items-center justify-center gap-3 w-full h-full rounded-md">
        <div className="contact-form w-1/2">
          <form action="contact" method="post" className="flex flex-col gap-2">
            <span className="name flex relative w-[80%]">
              {name === "" && (
                <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                  Your name
                </p>
              )}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border-none outline-none rounded-md"
              />
            </span>
            <span className="email flex relative  w-[80%]">
              {email === "" && (
                <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                  Email
                </p>
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-none outline-none rounded-md"
              />
            </span>
            <span className="web flex relative w-[80%]">
              {website === "" && (
                <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                  Your Website Url (If exists)
                </p>
              )}
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-2 border-none outline-none rounded-md"
              />
            </span>
            <span className="textarea flex relative w-[80%]">
              {message === "" && (
                <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                  How can i help?*
                </p>
              )}
              <textarea
                name="message"
                rows={5}
                cols={30}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border-none outline-none rounded-md"
              ></textarea>
            </span>

            <div className="form-btn flex flex-row items-center justify-start gap-2">
              <button
                type="submit"
                className="p-3 flex rounded-md bg-[--black] text-[--white] font-semibold lg:text-[24px] border-[2px] border-[--black] md:text-[16px] hover:border-[--black] hover:bg-[--white] hover:text-[--black] transition-all duration-300 ease-in-out"
              >
                Get In Touch
              </button>

              <div className="social_icons flex flex-row relative lg:gap-4 md:gap-2">
                <Link
                  href="#"
                  className="flex lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="#"
                  className="flex lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaReddit />
                </Link>
                <Link
                  href="#"
                  className="flex lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href="#"
                  className="flex lg:w-[50px] lg:h-[50px] md:w-[40px] md:h-[40px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaDiscord />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="contact-text w-1/2 flex flex-col h-full gap-3">
          <div className="text_head font-sora flex">
            <span className="text-[--black] md:text-[36px] lg:text-[60px]">
              <b className="md:font-bold lg:font-extrabold">
                Let's{" "}
                <span className="font-outline-2 text-[--white]">talk</span> for{" "}
                <br />
                Something special
              </b>{" "}
            </span>
          </div>
          <div className="text-body text-[16px] font-normal opacity-55">
            <p>
              I seek to push the limits of creativity to create high-engaging,
              user-friendly, and memorable interactive experiences.
            </p>
          </div>
          <div className="text-foot text-lg font-bold gap-3">
            <p className="email">MyEmail@gmail.com</p>
            <p className="phone">1234567890</p>
          </div>
        </div>
      </div>
    );
}