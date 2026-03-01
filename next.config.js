/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fix for the workspace root issue
    outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
