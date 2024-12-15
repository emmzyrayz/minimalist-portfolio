'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer/page";
import { Navbar } from "@/components/navbar/page";
import { useState, useEffect } from "react";
import { LoaderPage } from "@/components/loading/page";
import { ScrollVisibilityProvider } from "@/context/scrollvisbility";

// Import the metadata
import { baseMetadata } from "@/utils/metadata"; // Adjust the import path as needed

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sora = localFont({
  src: [
    {
      path: "./fonts/Sora-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Sora-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Sora-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sora",
});

const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay after content is loaded

    return () => clearTimeout(timer);
  }, []);

  // This effect runs when the component mounts
  useEffect(() => {
    const handleLoad = () => {
      // Content is fully loaded
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <ScrollVisibilityProvider>
      <html
        lang="en"
        className={`
      ${geistSans.variable} 
      ${geistMono.variable} 
      ${sora.variable} 
      antialiased
    `}
      >
        <head>
          {/* <title>{metadata.title as string}</title>
          <meta name="description" content={metadata.description as string} /> */}
        </head>
        <body>
          <div>
            {loading ? (
              <LoaderPage />
            ) : (
              <div>
                <Navbar />
                {children}
                <Footer />
              </div>
            )}
          </div>
        </body>
      </html>
    </ScrollVisibilityProvider>
  );
}
