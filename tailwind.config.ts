import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // blue-800
        secondary: "#2563EB", // blue-600
        accent: "#FACC15", // yellow-400
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;
