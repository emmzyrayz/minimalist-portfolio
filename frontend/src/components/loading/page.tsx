"use client";
import "./load.css";
import {useEffect, useState} from "react";


export const LoaderPage = () => {
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hint, setHint] = useState("");

  const hints = [
    "Use semantic HTML for better accessibility.",
    "CSS Grid is great for creating complex layouts.",
    "Always optimize images for faster loading times.",
    "Consider using a CSS preprocessor like SASS or LESS.",
    "Keep your JavaScript modular for better maintainability.",
    "Use version control systems like Git for your projects.",
    "Test your website on multiple browsers for compatibility.",
    "Utilize browser developer tools for debugging.",
    "Learn about responsive design to improve user experience.",
    "Stay updated with the latest web development trends.",
  ];

  const getRandomHint = () => {
    const randomIndex = Math.floor(Math.random() * hints.length);
    return hints[randomIndex];
  };

  useEffect(() => {
    // Set a random hint after the component mounts
    setHint(getRandomHint());

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(interval);
          return 100; // Ensure it reaches 100%
        }
        return prevWidth + 10; // Increment width
      });
    }, 300); // Adjust interval timing as needed

    // Simulate page load completion
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingWidth(100); // Set to full width when done
      setTimeout(() => {
        setLoading(false); // Hide loader after a delay
      }, 3000); // Delay before hiding
    }, 3000); // Simulate loading time

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="loading w-[100vw] h-[100vh] relative flex items-center justify-center z-10 cursor-wait">
      <div className="loading-line" style={{width: `${loadingWidth}%`}}></div>
      <div className="pl">
        <div className="pl__sphere"></div>
        <span className="pl__sphere-shadow"></span>
        <div className="pl__sphere"></div>
        <span className="pl__sphere-shadow"></span>
        <div className="pl__sphere"></div>
        <span className="pl__sphere-shadow"></span>
        <div className="pl__sphere"></div>
        <span className="pl__sphere-shadow"></span>
      </div>

      <div className="hint absolute font-sora text-[--white] top-10 font-bold text-xl w-full items-center justify-center flex flex-col text-center">
        <span className="text-xl font-extrabold mb-2">Hint:</span>
        <p>{hint}</p>
      </div>
    </div>
  );
};
