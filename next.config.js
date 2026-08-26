/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allows <Image> to load thumbnails/posters stored in Supabase Storage.
    // Supabase public storage URLs look like: https://<project-ref>.supabase.co/storage/v1/object/public/...
  remotePatterns: [
  {
    protocol: "https",
    hostname: "*.supabase.co",
  },
  {
    protocol: "https",
    hostname: "placehold.co",
  },
],
  },
};

module.exports = nextConfig;
