import "./project.css";
import React, {useEffect, useState, useCallback, useMemo} from "react";
import Image
// { StaticImageData } 
from "next/image";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";
import {debounce} from "lodash";

// Types
interface Language {
  name: string;
  percentage: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Language[];
  image: string;
  githubLink: string;
  liveLink?: string;
  stars: number;
  updatedAt: string;
  createdAt: string;
}

interface ProjectCardProps extends Project {
  isEvenIndex: boolean;
}

// // Cache management
// const CACHE_KEY = 'github-projects-cache';
// const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// interface CacheData {
//   timestamp: number;
//   projects: Project[];
// }



// // Utility functions
// const getCache = (): CacheData | null => {
//   const cached = localStorage.getItem(CACHE_KEY);
//   if (!cached) return null;
  
//   const data: CacheData = JSON.parse(cached);
//   if (Date.now() - data.timestamp > CACHE_DURATION) {
//     localStorage.removeItem(CACHE_KEY);
//     return null;
//   }
  
//   return data;
// };

// const setCache = (projects: Project[]) => {
//   const cacheData: CacheData = {
//     timestamp: Date.now(),
//     projects,
//   };
//   localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
// };

// Filter and Sort Components
const FilterSort: React.FC<{
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  sortOption: string;
}> = ({ onFilterChange, onSortChange, sortOption }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
      <input
        type="text"
        placeholder="Filter projects..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full md:w-64"
      />
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full md:w-48"
      >
        <option value="updated">Last Updated</option>
        <option value="created">Newest First</option>
        <option value="stars">Most Stars</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

// data/projectsData.ts
// export const projectsData: Project[] = [
//   {
//     id: 1,
//     title: "Project Alpha",
//     description:
//       "A comprehensive web application that solves complex problems...",
//     technologies: ["React", "TypeScript", "Tailwind"],
//     image: img1,
//     githubLink: "https://github.com/username/project1",
//     liveLink: "https://project1-live.com",
//   },
//   {
//     id: 2,
//     title: "Project Beta",
//     description: "An innovative solution that revolutionizes...",
//     technologies: ["Next.js", "GraphQL", "Prisma"],
//     image: img2,
//     githubLink: "https://github.com/username/project2",
//     liveLink: "https://project2-live.com",
//   },
//   {
//     id: 3,
//     title: "Project Beta",
//     description: "An innovative solution that revolutionizes...",
//     technologies: ["Next.js", "GraphQL", "Prisma"],
//     image: img3,
//     githubLink: "https://github.com/username/project2",
//     liveLink: "https://project2-live.com",
//   },
//   // Add more projects...
// ];

interface ProjectCardProps extends Project {
  isEvenIndex: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  githubLink,
  liveLink,
  isEvenIndex,
}) => {
  const [imgError, setImgError] = useState(false);

  // Generate a fallback image URL using the project name
  const fallbackImage = `/api/placeholder/600/400?text=${encodeURIComponent(
    title
  )}`;
  

  return (
    <div
      className={`flex flex-col font-sora md:flex-row items-center 
      ${isEvenIndex ? "md:flex-row-reverse" : "md:flex-row"} 
      my-16 space-y-6 md:space-y-0 md:space-x-10`}
    >
      {/* Image Container */}
      <div
        className={`w-full md:w-1/2 relative 
        ${isEvenIndex ? "md:ml-auto" : "md:mr-auto"}
        shadow-2xl rounded-lg overflow-hidden`}
      >
        <Image
          src={imgError ? fallbackImage : image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
          priority={false}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Description Container */}
      <div
        className={`w-full md:w-1/2 text-center 
        ${
          isEvenIndex ? "md:text-right md:pr-10" : "md:text-left md:pl-10"
        } space-y-4`}
      >
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>

        <div
          className={`p-6 bg-gray-100 rounded-lg shadow-md 
          ${isEvenIndex ? "md:text-right" : "md:text-left"}`}
        >
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Technologies */}
        <div
          className={`flex flex-wrap gap-2 justify-center 
          ${isEvenIndex ? "md:justify-end" : "md:justify-start"}`}
        >
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[--black] text-[--white] px-3 py-1 rounded-full text-sm"
            >
              {`${tech.name} ${tech.percentage.toFixed(1)}%`}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className={`flex gap-4 mt-4 justify-center
          ${isEvenIndex ? "md:justify-end" : "md:justify-start"}`}
        >
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaGithub size={24} />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaExternalLinkAlt size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("updated");
  // const [retryCount, setRetryCount] = useState(0);

  

  // // Use in your code
  // const GITHUB_TOKEN = getEnvVar("NEXT_PUBLIC_GITHUB_TOKEN");
  // const APP_URL = getEnvVar("NEXT_PUBLIC_APP_URL");

  // Debounced filter function
  const debouncedSetFilter = useMemo(
    () => debounce((value: string) => setFilter(value), 300),
    []
  );

  const fetchProjects = useCallback( async () => {
    setLoading(true);
    setError(null);


    try {
      // // Check cache first if not skipping
      // if (!skipCache) {
      //   const cached = getCache();
      //   if (cached) {
      //     setProjects(cached.projects);
      //     setLoading(false);
      //     return;
      //   }
      // }

      // Utility to check environment variables
      // const getEnvVar = (name: string): string => {
      //   const value = process.env[name];
      //   if (!value) {
      //     throw new Error(`Missing environment variable: ${name}`);
      //   }
      //   return value;
      // };

      // Get GitHub token from environment variables
      const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

      if (!GITHUB_TOKEN) {
        throw new Error("GitHub token is not configured");
      }

      const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${GITHUB_TOKEN}`,
      };

      // First, test the API connection
      const testResponse = await fetch("https://api.github.com/rate_limit", {
        headers,
      });

      if (!testResponse.ok) {
        if (testResponse.status === 403) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error(`GitHub API error: ${testResponse.statusText}`);
      }

      // Add authorization if token is available
      if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
        headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
      }

      // Fetch repositories
      const reposResponse = await fetch(
        "https://api.github.com/users/emmzyrayz/repos?per_page=100&sort=updated",
        {headers}
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.statusText}`);
      }

      const repos = await reposResponse.json();

      const projectsData = await Promise.all(
        repos.map(
          async (repo: {
            id: number;
            name: string;
            description: string;
            languages_url: string;
            homepage: string;
            has_pages: boolean;
            html_url: string;
            full_name: string;
            stargazers_count: number;
            updated_at: string;
            created_at: string;
          }) => {
            try {
              // Fetch languages with error handling
              const languagesResponse = await fetch(repo.languages_url, {
                headers,
              });
              const languages: Record<string, number> =
                await languagesResponse.json();

              // Calculate language percentages
              const totalBytes = Object.values(languages).reduce(
                (a: number, b: number) => a + b,
                0
              );

              const technologiesWithPercentages = Object.entries(languages).map(
                ([name, bytes]) => ({
                  name,
                  percentage: ((bytes as number) / totalBytes) * 100,
                })
              );

              // Use repo description as fallback if README fetch fails
              let description = repo.description || "No description available";

              try {
                const readmeResponse = await fetch(
                  `https://api.github.com/repos/emmzyrayz/${repo.name}/readme`,
                  {headers}
                );

                if (readmeResponse.ok) {
                  const readme = await readmeResponse.json();
                  const decodedContent = atob(readme.content);
                  const firstParagraph = decodedContent
                    .split("\n\n")[0]
                    .replace(/[#\n]/g, "")
                    .trim();
                  if (firstParagraph) {
                    description = firstParagraph;
                  }
                }
              } catch {
                console.warn(`Could not fetch README for ${repo.name}`);
              }

              const deploymentUrl =
                repo.homepage ||
                (repo.has_pages
                  ? `https://emmzyrayz.github.io/${repo.name}`
                  : undefined);

              return {
                id: repo.id,
                title: repo.name,
                description,
                technologies: technologiesWithPercentages,
                image: repo.homepage
                  ? `https://opengraph.githubassets.com/1/${repo.full_name}`
                  : `/api/placeholder/600/400`,
                githubLink: repo.html_url,
                liveLink: deploymentUrl,
                stars: repo.stargazers_count,
                updatedAt: repo.updated_at,
                createdAt: repo.created_at,
              };
            } catch (error) {
              console.error(`Error processing repository ${repo.name}:`, error);
              return null;
            }
          }
        )
      );

      const validProjects = projectsData.filter(
        (project): project is Project => project !== null
      );

      if (validProjects.length === 0) {
        throw new Error("No valid projects found");
      }

      setProjects(validProjects);
      setLoading(false);
    } catch (error: unknown) {
      setError("Failed to fetch projects. Please try again later.");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const searchTerm = filter.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.technologies.some((tech) =>
            tech.name.toLowerCase().includes(searchTerm)
          )
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "updated":
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          case "created":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "stars":
            return b.stars - a.stars;
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [projects, filter, sortOption]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProjects}
          className="px-4 py-2 bg-[--black] text-white rounded-lg hover:bg-[--gray-3] hover:text-black border border-white hover:border-black hover:border-2 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className=" font-sora text-4xl font-medium text-center mb-12">
        My <span className="text-[--black] font-extrabold">Projects</span>
      </h1>

      <FilterSort
        onFilterChange={debouncedSetFilter}
        onSortChange={setSortOption}
        sortOption={sortOption}
      />

      {filteredAndSortedProjects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No projects match your search criteria
        </div>
      ) : (
        <div className="space-y-16">
          {filteredAndSortedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              isEvenIndex={index % 2 === 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
