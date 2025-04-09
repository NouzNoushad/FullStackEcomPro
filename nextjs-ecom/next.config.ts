import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/users/login",
                permanent: false,
            }
        ]
    }
};

export default nextConfig;
