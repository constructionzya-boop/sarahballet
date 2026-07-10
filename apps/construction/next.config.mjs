/** @type {import('next').NextConfig} */
const nextConfig = {
  // Le design system est consommé en source (pas de build séparé).
  transpilePackages: ["@noema/ui"],
  // Le lint est exécuté par la CI via `turbo lint` (source de vérité unique).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
