/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // If your GitHub repo is at username.github.io/raahii — set basePath:
  // basePath: '/raahii',
  // If you use a custom domain (raahii.us) — leave basePath empty (already done)
};

module.exports = nextConfig;
