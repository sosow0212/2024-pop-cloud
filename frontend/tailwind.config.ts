/* eslint-disable*/
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
      sm: { max: "375px" },
      md: { min: "744px" },
      lg: { min: "1200px" },
      xl: { min: "1280px" },
    },
    extend: {
      colors: {},
    },
    fontSize: {
      // landing
      "40-600": ["40px", { lineHeight: "38px", fontWeight: "600" }],
      "48-600": ["48px", { lineHeight: "38px", fontWeight: "600" }],
      "64-600": ["64px", { lineHeight: "38px", fontWeight: "600" }],

      // 3xl (32px)
      "32-700": ["32px", { lineHeight: "38px", fontWeight: "700" }],
      "32-600": ["32px", { lineHeight: "38px", fontWeight: "600" }],
      "32-500": ["32px", { lineHeight: "38px", fontWeight: "500" }],

      // 2xl (24px)
      "24-700": ["24px", { lineHeight: "28px", fontWeight: "700" }],
      "24-600": ["24px", { lineHeight: "28px", fontWeight: "600" }],
      "24-500": ["24px", { lineHeight: "28px", fontWeight: "500" }],
      "24-400": ["24px", { lineHeight: "28px", fontWeight: "400" }],

      // xl (20px)
      "20-700": ["20px", { lineHeight: "24px", fontWeight: "700" }],
      "20-600": ["20px", { lineHeight: "24px", fontWeight: "600" }],
      "20-500": ["20px", { lineHeight: "24px", fontWeight: "500" }],
      "20-400": ["20px", { lineHeight: "24px", fontWeight: "400" }],

      // 2lg (18px)
      "18-700": ["18px", { lineHeight: "21px", fontWeight: "700" }],
      "18-600": ["18px", { lineHeight: "21px", fontWeight: "600" }],
      "18-500": ["18px", { lineHeight: "21px", fontWeight: "500" }],
      "18-400": ["18px", { lineHeight: "21px", fontWeight: "400" }],

      // lg (16px)
      "16-700": ["16px", { lineHeight: "19px", fontWeight: "700" }],
      "16-600": ["16px", { lineHeight: "19px", fontWeight: "600" }],
      "16-500": ["16px", { lineHeight: "19px", fontWeight: "500" }],
      "16-400": ["16px", { lineHeight: "19px", fontWeight: "400" }],

      // md (14px)
      "14-700": ["14px", { lineHeight: "17px", fontWeight: "700" }],
      "14-600": ["14px", { lineHeight: "17px", fontWeight: "600" }],
      "14-500": ["14px", { lineHeight: "17px", fontWeight: "500" }],
      "14-400": ["14px", { lineHeight: "17px", fontWeight: "400" }],

      // sm (13px)
      "13-600": ["13px", { lineHeight: "16px", fontWeight: "600" }],
      "13-500": ["13px", { lineHeight: "16px", fontWeight: "500" }],

      // xs (12px)
      "12-600": ["12px", { lineHeight: "14px", fontWeight: "600" }],
      "12-500": ["12px", { lineHeight: "14px", fontWeight: "500" }],
      "12-400": ["12px", { lineHeight: "14px", fontWeight: "400" }],
    },
  },
  plugins: [],
};
export default config;
