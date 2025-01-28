/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.masakapahariini.com",
      "images.unsplash.com",
      "photo-sharing-api-bootcamp.do.dibimbing.id",
      "depositphotos-blog.s3.eu-west-1.amazonaws.com",
      "cdn1-production-images-kly.akamaized.net",
      "upload.wikimedia.org",
      "www.blibli.com",
      "static.republika.co.id",
      "www.google.com",
      "www.nestleprofessional.co.id",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;
