/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.cloudflare.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
    },
    // Disable body parsing for Stripe webhooks
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
};

export default nextConfig;
