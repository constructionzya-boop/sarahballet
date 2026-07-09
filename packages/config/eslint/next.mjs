import next from "@next/eslint-plugin-next";
import react from "./react.mjs";

/** Preset ESLint pour les apps Next.js du monorepo (7 sites). */
export default [
  ...react,
  {
    files: ["**/*.{ts,tsx,jsx}"],
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
];
