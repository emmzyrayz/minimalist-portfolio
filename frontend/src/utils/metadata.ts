import {Metadata} from "next";

// Define a more explicit type for page params
interface PageParams {
  page?: string;
}

// Separate the base metadata configuration
export const baseMetadata: Metadata = {
  // Basic SEO Tags
  title: "Nnamdi Emmanuel Dike - Frontend Web Developer",
  description:
    "Passionate Frontend Web Developer creating innovative digital experiences. Specialized in React, Next.js, and modern web technologies.",

  // Open Graph Tags for Social Media
  openGraph: {
    title: "Nnamdi Emmanuel Dike - Frontend Web Developer Portfolio",
    description:
      "Explore the portfolio of a skilled Frontend Web Developer specializing in creating responsive, performant web applications.",
    url: "https://www.nnamdiemmanuel.dev",
    siteName: "Nnamdi Emmanuel Dike Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nnamdi Emmanuel Dike - Frontend Web Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card Tags
  twitter: {
    card: "summary_large_image",
    title: "Nnamdi Emmanuel Dike - Frontend Web Developer",
    description:
      "Innovative Frontend Web Developer crafting exceptional digital experiences.",
    images: ["/images/twitter-card.jpg"],
  },

  // Additional SEO Optimization
  keywords: [
    "Frontend Web Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend Portfolio",
    "Web Design",
    "UI/UX",
    "Responsive Web Design",
  ],

  // Robots Meta Tag for SEO Control
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternate Language and Canonical URL
  alternates: {
    canonical: "https://www.nnamdiemmanuel.dev",
    languages: {
      "en-US": "https://www.nnamdiemmanuel.dev",
    },
  },

  // Verification Tags (Corrected)
  verification: {
    google: "your-google-site-verification-code",
  },
};

// Page-specific metadata generator
export function generateMetadata({params}: {params: PageParams}): Metadata {
  // Define page-specific metadata with explicit typing
  const pageSpecificMetadata: Record<string, Partial<Metadata>> = {
    projects: {
      title: "Projects | Nnamdi Emmanuel Dike",
      description:
        "A showcase of innovative web development projects demonstrating technical expertise and creative problem-solving.",
    },
    about: {
      title: "About Me | Nnamdi Emmanuel Dike",
      description:
        "Learn about my journey as a Frontend Web Developer, my skills, and professional background.",
    },
  };

  // Merge base metadata with page-specific metadata
  const pageName = params.page?.toLowerCase();
  const pageMetadata: Metadata =
    pageName && pageSpecificMetadata[pageName]
      ? {...baseMetadata, ...pageSpecificMetadata[pageName]}
      : baseMetadata;

  return pageMetadata;
}

// Export a default metadata object for root/default pages
export const metadata = baseMetadata;