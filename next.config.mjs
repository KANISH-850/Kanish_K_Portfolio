/** @type {import('next').NextConfig} */

// Detect GitHub Pages deployment environment
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

// In GitHub Actions, GITHUB_REPOSITORY is in the format "owner/repo" (e.g. "KANISH-850/Kanish_K_Portfolio")
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, "") : "";
const isUserSite = repo.toLowerCase().endsWith(".github.io");

// For GitHub Pages project site deployed via GitHub Actions, basePath is /<repo-name>.
// For local development or user site (e.g. username.github.io), basePath is empty string.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGitHubActions && !isUserSite && repo ? `/${repo}` : "");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
