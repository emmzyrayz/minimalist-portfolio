"use client";
import React, {useState} from "react";
import "./auth.css";
import ShowSVGComponent from "@/assets/icons/showicon";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/authcontext";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {subscribeUser} = useAuth();
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isSkip: boolean = false
  ) => {
    e.preventDefault();
    setError(null);

    try {
      // If skipping, just continue
      if (isSkip) {
        router.push("/");
        return;
      }

      // Determine role based on admin checkbox
      const role = isAdmin ? "admin" : "user";

      // Validate email if not skipping
      if (!isSkip && (!email || !name)) {
        setError("Name and email are required");
        return;
      }

      // If admin, password is required
      if (isAdmin && !password) {
        setError("Password is required for admin role");
        return;
      }

      // Subscribe user
      await subscribeUser({
        name,
        email,
        password: isAdmin ? password : undefined,
        role,
      });

      // Optional: Subscribe to newsletter
      if (isNewsletterSubscribed) {
        // Implement newsletter subscription logic here
        console.log("Subscribed to newsletter");
      }

      // Redirect or show success message
      router.push("/");
    } catch (err) {
      // Assuming the error might have a response property
      const errorMessage =
        (err as {response?: {data?: {message?: string}}})?.response?.data
          ?.message || "Subscription failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-section w-full h-[87vh] p-4 flex flex-row items-center justify-center gap-3">
      <div className="auth-con flex flex-col w-1/2 gap-2">
        <div className="auth-head flex flex-col items-start justify-center gap-3">
          <span className="text-2xl font-bold">Welcome to my portfolio</span>
          <span className="text-lg font-semibold">
            Optional Registration for Portfolio Messaging
          </span>
          <span className="text-sm font-medium">
            NOTE: Registration is optional. You can skip or provide details to
            use the messaging platform.
          </span>
        </div>
        <div className="auth-body">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col relative items-center justify-center md:items-start p-2 gap-2 w-full"
          >
            {error && (
              <div className="w-[80%] bg-red-100 text-red-700 p-2 rounded-md">
                {error}
              </div>
            )}

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
            {isAdmin && (
              <span className="password flex relative w-[80%]">
                {password === "" && (
                  <p className="absolute top-2 left-2 font-semibold text-[14px] text-gray-500 pointer-events-none">
                    Admin Password
                  </p>
                )}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border-none outline-none rounded-md"
                />
              </span>
            )}

            <div className="w-[80%] flex items-center gap-2">
              <input
                type="checkbox"
                id="admin-check"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label htmlFor="admin-check">Are you the admin?</label>
            </div>

            <div className="w-[80%] flex items-center gap-2">
              <input
                type="checkbox"
                id="newsletter-check"
                checked={isNewsletterSubscribed}
                onChange={() =>
                  setIsNewsletterSubscribed(!isNewsletterSubscribed)
                }
              />
              <label htmlFor="newsletter-check">Subscribe to Newsletter</label>
            </div>

            <div className="form-btn flex flex-row w-full items-center md:justify-start justify-center gap-2">
              <button
                type="submit"
                className="items-center justify-center p-2 flex rounded-md bg-[--black] text-[--white] md:font-bold font-semibold w-[120px] md:h-[40px] h-[30px] border-[2px] border-[--black] text-[14px] hover:border-[--black] hover:bg-[--white] hover:text-[--black] transition-all duration-300 ease-in-out"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e as any, true)}
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
