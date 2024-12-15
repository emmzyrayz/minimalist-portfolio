"use client";
import React, {useState} from "react";
import "./auth.css";
import ShowSVGComponent from "@/assets/icons/showicon";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-section w-full h-[87vh] p-4 flex flex-row items-center justify-center gap-3">
      <div className="auth-con flex flex-col w-1/2 gap-2">
        <div className="auth-head flex flex-col items-start justify-center gap-3">
          <span className="text-2xl font-bold">Welcome to my portfolio</span>
          <span className="text-lg font-semibold">
            Please enter your name, email and password to continue
          </span>
          <span className="text-sm font-medium">
            NOTE: <br /> {"  "}Resgistration is optional and you can skip it by just clicking
            on <span className="font-semibold">Continue</span> and same goes for password as
            i as the registration is only for those who choose to communicate to
            me through my portfolio message platform
          </span>
        </div>
        <div className="auth-body">
          <form
            action="/auth"
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
                required
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
                required
              />
            </span>
            <span className="password flex relative w-[80%]">
              {password === "" && (
                <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                  Your Website Url (If exists)
                </p>
              )}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-none outline-none rounded-md"
              />
            </span>

            <div className="form-btn flex flex-row w-full items-center md:justify-start justify-center gap-2">
              <button
                type="submit"
                className="items-center justify-center p-2 flex rounded-md bg-[--black] text-[--white] md:font-bold font-semibold w-[120px] md:h-[40px] h-[30px] border-[2px] border-[--black] text-[14px] hover:border-[--black] hover:bg-[--white] hover:text-[--black] transition-all duration-300 ease-in-out"
              >
                Sign in
              </button>

              <button
                type="submit"
                className="items-center justify-center p-2 flex rounded-md bg-[--white] text-[--black] md:font-bold font-semibold w-[120px] md:h-[40px] h-[30px] border-[2px] border-[--black] text-[14px] hover:border-[--black] hover:bg-[--black] hover:text-[--white] transition-all duration-300 ease-in-out"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="auth-img w-1/2 ">
        <ShowSVGComponent
          primaryColor="white"
          secondaryColor="black"
          strokeColor="black"
          width="100%"
          height="96%"
          className={`relative w-full h-full -z-10`}
        />
      </div>
    </div>
  );
}
