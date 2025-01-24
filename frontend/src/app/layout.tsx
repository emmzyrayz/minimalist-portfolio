'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer/page";
import { Navbar } from "@/components/navbar/page";
import { useState, useEffect } from "react";
import { LoaderPage } from "@/components/loading/page";
import { ScrollVisibilityProvider } from "@/context/scrollvisbility";
import {usePathname, useRouter} from "next/navigation";

// Import the metadata
import { baseMetadata } from "@/utils/metadata"; // Adjust the import path as needed
import { AuthProvider, useAuth } from "@/context/authcontext";
import env  from "@/utils/env";

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

// Wrapper component to handle auth checks
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  

  useEffect(() => {
    // List of public routes that don't require authentication
    const publicRoutes = [
      "/auth",
      "/login",
      "/register",
      "/projectform",
      "/projectintro",
    ];
    
    if (!isLoading && !user && !publicRoutes.includes(pathname)) {
      // Store the intended destination
      sessionStorage.setItem("redirectAfterAuth", pathname);
      router.push("/auth");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <LoaderPage />;
  }

  return children;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Get the current pathname

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

  // const {valid, missing, available} = env.validateEnvVars();
  // if (!valid) {
    // console.error("Missing required environment variables:", missing);
    // console.log("Available environment variables:", available);
  // }

  // Add this somewhere during app initialization
  // console.log("Environment:", {
  //   NODE_ENV: process.env.NODE_ENV,
  //   envVarsPresent: Object.keys(process.env).filter(
  //     (key) =>
  //       key.includes("GITHUB") ||
  //       key.includes("MONGODB") ||
  //       key.includes("APP_URL") ||
  //       key.includes("JWT") ||
  //       key.includes("ENCRYPTION")
  //   ),
  // });

  // Run validation
  // const validationResult = env.validateEnvVars();
  // console.log("Validation result:", validationResult);

  // Define the pages where you want to hide the Navbar and Footer
  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/projectform",
    "/projectintro",
  ]; // Add your routes here

  return (
    <AuthProvider>
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
            <title>{metadata.title as string}</title>
            <meta name="description" content={metadata.description as string} />
          </head>
          <body>
            <div>
              {loading ? (
                <LoaderPage />
              ) : (
                <div>
                  <LayoutWrapper>
                    {!hideNavbarFooterRoutes.includes(pathname) && <Navbar />}
                    {children}
                    {!hideNavbarFooterRoutes.includes(pathname) && <Footer />}
                  </LayoutWrapper>
                </div>
              )}
            </div>
          </body>
        </html>
      </ScrollVisibilityProvider>
    </AuthProvider>
  );
}
