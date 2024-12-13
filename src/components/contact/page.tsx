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
      <div className="contact-section flex flex-col md:flex-row container md:mx-auto md:px-4 md:py-12 font-sora items-center justify-center md:gap-3 gap-2 w-full h-full p-[4%] rounded-md">
        <div className="contact-form md:w-1/2 w-full flex items-center justify-center md:items-start">
          <form
            action="contact"
            method="post"
            className="flex flex-col relative items-center justify-center md:items-start p-2 gap-2 w-full"
          >
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

            <div className="form-btn flex flex-row w-full items-center md:justify-start justify-center gap-2">
              <button
                type="submit"
                className="items-center justify-center p-2 flex rounded-md bg-[--black] text-[--white] md:font-bold font-semibold w-[120px] md:h-[40px] h-[30px] border-[2px] border-[--black] text-[14px] hover:border-[--black] hover:bg-[--white] hover:text-[--black] transition-all duration-300 ease-in-out"
              >
                Get In Touch
              </button>

              <div className="social_icons flex flex-row relative md:gap-4 gap-2">
                <Link
                  href="#"
                  className="flex md:w-[40px] md:h-[40px] w-[30px] h-[30px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="#"
                  className="flex  md:w-[40px] md:h-[40px] w-[30px] h-[30px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaReddit />
                </Link>
                <Link
                  href="#"
                  className="flex  md:w-[40px] md:h-[40px] w-[30px] h-[30px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href="#"
                  className="flex  md:w-[40px] md:h-[40px] w-[30px] h-[30px] items-center justify-center border-[2px] border-[--black] lg:text-[30px] md:text-[20px] rounded-md hover:bg-[--black] hover:text-[--white] hover:border-[--black] transition-all duration-300 ease-in-out"
                >
                  <FaDiscord />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="contact-text md:w-1/2 w-full flex flex-col items-center justify-center md:items-start h-full gap-3">
          <div className="text_head font-sora flex w-full items-center justify-center md:justify-start">
            <span className="text-[--black] md:text-[36px] text-[28px] lg:text-[60px]">
              <b className="md:font-bold lg:font-extrabold font-semibold">
                Let's{" "}
                <span className="font-outline-2 text-[--white]">talk</span> for{" "}
                <br />
                Something special
              </b>{" "}
            </span>
          </div>
          <div className="text-body text-[14px] md:text-[16px] md:w-full font-normal opacity-55 w-[70%]">
            <p>
              I seek to push the limits of creativity to create high-engaging,
              user-friendly, and memorable interactive experiences.
            </p>
          </div>
          <div className="text-foot flex flex-col text-lg font-bold gap-3 w-full items-center justify-center md:items-start">
            <p className="email">MyEmail@gmail.com</p>
            <p className="phone">1234567890</p>
          </div>
        </div>
      </div>
    );
}