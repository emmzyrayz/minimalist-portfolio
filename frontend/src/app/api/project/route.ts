import {NextApiRequest, NextApiResponse} from "next";
import env from "@/utils/env";
import {NextResponse} from "next/server";

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

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  languages_url: string;
  has_pages: boolean;
  stargazers_count: number;
  updated_at: string;
  created_at: string;
}

interface GitHubReadme {
  content: string;
}
export async function GET() {
  try {
    const GITHUB_TOKEN = env.getGitHubToken();

    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token is not configured");
    }

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };

    console.log("Token length:", GITHUB_TOKEN.length);
    console.log("Token starts with:", GITHUB_TOKEN.substring(0, 10));


    // First, test the API connection
    const testResponse = await fetch("https://api.github.com/rate_limit", {
      headers,
      cache: "no-store",
    });

    console.log("Rate Limit Response Status:", testResponse.status);
    console.log(
      "Rate Limit Response Headers:",
      Object.fromEntries(testResponse.headers)
    );



    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error("Rate Limit Error Text:", errorText);
      throw new Error(
        `GitHub API connection test failed: ${testResponse.status} ${testResponse.statusText}. 
        Details: ${errorText}`
      );
    }

    // Fetch and parse rate limit data for additional context
    const rateLimitData = await testResponse.json();
    console.log("Rate Limit Data:", JSON.stringify(rateLimitData, null, 2));


    // Add authorization if token is available
    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    // Fetch repositories
    const reposResponse = await fetch(
      "https://api.github.com/users/emmzyrayz/repos?per_page=100&sort=updated",
      {headers, cache: "no-store"}
    );

    console.log("Repos Fetch Response:", reposResponse.status);

    if (!reposResponse.ok) {
      const errorText = await reposResponse.text();
      throw new Error(
        `GitHub API error: ${reposResponse.status} ${reposResponse.statusText}. Details: ${errorText}`
      );
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Process repositories
    const projects = await Promise.all(
      repos
        .filter((repo) => repo.homepage !== null && repo.homepage !== "")
        .map(async (repo: GitHubRepo) => {
          // Fetch languages
          const languagesResponse = await fetch(repo.languages_url, {
            headers,
            cache: "no-store",
          });

          if (!languagesResponse.ok) {
            throw new Error(
              `Failed to fetch languages: ${languagesResponse.status}`
            );
          }

          const languages: Record<string, number> =
            await languagesResponse.json();

          // Calculate language percentages
          const totalBytes = Object.values(languages).reduce(
            (a, b) => a + b,
            0
          );

          const technologiesWithPercentages = Object.entries(languages).map(
            ([name, bytes]) => ({
              name,
              percentage: (bytes / totalBytes) * 100,
            })
          );

          // Use repo description as fallback if README fetch fails
          let description = repo.description || "No description available";

          try {
            const readmeResponse = await fetch(
              `https://api.github.com/repos/emmzyrayz/${repo.name}/readme`,
              {headers, cache: "no-store"}
            );

            if (readmeResponse.ok) {
              const readme: GitHubReadme = await readmeResponse.json();
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

          // Create the project object with explicit type
          const project: Project = {
            id: repo.id,
            title: repo.name,
            description,
            technologies: technologiesWithPercentages,
            image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
            githubLink: repo.html_url,
            stars: repo.stargazers_count,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at,
          };

          // Add liveLink since we know homepage exists (due to filter above)
          project.liveLink = repo.homepage!; // '!' is safe here due to filter

          // Add liveLink only if it exists
          const deploymentUrl =
            repo.homepage ||
            (repo.has_pages
              ? `https://emmzyrayz.github.io/${repo.name}`
              : undefined);

          if (deploymentUrl) {
            project.liveLink = deploymentUrl;
          }

          return project;
        })
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Comprehensive Error Details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      name: error instanceof Error ? error.name : "Unknown error type",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
   return NextResponse.json(
     {
       error: "Failed to fetch projects",
       details: error instanceof Error ? error.message : "Unknown error",
     },
     {status: 500}
   );
  }
}
