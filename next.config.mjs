/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: ''
            }
        ]
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        MONGODB_URI: process.env.MONGODB_URI,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
        UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
        UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    }
};

export default nextConfig;
