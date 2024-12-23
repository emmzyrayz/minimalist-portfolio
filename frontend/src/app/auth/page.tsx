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
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {subscribeUser} = useAuth();
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isSkip: boolean = false
  ) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSkip) {
        // Handle visitor subscription
        await subscribeUser({
          name: "Visitor",
          email: "",
          role: "visitor",
          newsletter: false,
        });
        router.push("/");
        return;
      }

      // Validate inputs
      if (!isSkip && (!email || !name)) {
        setError("Name and email are required");
        return;
      }

      if (isAdmin && !password) {
        setError("Password is required for admin role");
        return;
      }

      // Subscribe user
      await subscribeUser({
        name,
        email,
        password: isAdmin ? password : undefined,
        role: isAdmin ? "admin" : "user",
        newsletter: isNewsletterSubscribed,
      });

      // Redirect on success
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>, true);
  };

  return (
    <div className="auth-section w-full h-[87vh] p-4 flex flex-row items-center justify-center gap-3">
      <div className="auth-con flex flex-col w-1/2 gap-2">
        <div className="auth-head flex flex-col items-start justify-center gap-3">
          <span className="text-2xl font-bold">Welcome to my portfolio</span>
          <span className="text-lg font-semibold">
            Optional Registration to Unlock Portfolio's Inbuilt Features
          </span>
          <span className="text-sm font-medium">
            NOTE: Registration is optional. You can skip or provide details to
            unlock the inbuilt features.
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                  disabled={isLoading}
                />
              </span>
            )}

            <div className="w-[80%] flex items-center gap-2">
              <input
                type="checkbox"
                id="admin-check"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <label htmlFor="newsletter-check">Subscribe to Newsletter</label>
            </div>

            <div className="form-btn flex flex-row w-full items-center md:justify-start justify-center gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="items-center justify-center p-2 flex rounded-md bg-[--black] text-[--white] md:font-bold font-semibold w-[120px] md:h-[40px] h-[30px] border-[2px] border-[--black] text-[14px] hover:border-[--black] hover:bg-[--white] hover:text-[--black] transition-all duration-300 ease-in-out"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={handleSkipSubmit}
                disabled={isLoading}
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
