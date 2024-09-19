/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "480px" },
      md: "481px",
      lg: "769px",
      xl: "1280px",
    },
    extend: {
      colors: {},
    },
    fontSize: {},
  },
  plugins: [],
};
export default config;
