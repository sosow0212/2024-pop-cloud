/* eslint-disable*/
import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  darkMode: ["selector", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "744px" },
      md: { min: "744px" },
      lg: { min: "1200px" },
      xl: { min: "1280px" },
    },
    extend: {
      colors: {
        "blue-0": "#e7f5ff",
        "blue-1": "#d0ebff",
        "blue-2": "#a5d8ff",
        "blue-3": "#74c0fc",
        "blue-4": "#4dabf7",
        "blue-5": "#339af0",
        "blue-6": "#228be6",
        "blue-7": "#1c7ed6",
        "blue-8": "#1971c2",
        "blue-9": "#1864ab",
        "gray-1": "#333236",
        "gray-2": "rgba(255, 255, 255, 0.05)",
        "gray-3": "rgba(255, 255, 255, 0.6)",
        gray: {
          "00": "#fff",
          "05": "#fbfbfb",
          10: "#f6f6f8",
          15: "#ededf0",
          20: "#e5e5ea",
          30: "#dddee4",
          40: "#d5d6dd",
          50: "#c2c3cd",
          60: "#adaeb8",
          70: "#888893",
          80: "#66666E",
          90: "#4a494f",
          100: "#333236",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
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
    keyframes: {
      fadeIn: {
        from: { opacity: "0", transform: "translate3d(-50%, -60px, 0)" },
        to: { opacity: "1", transform: "translate3d(-50%, 0, 0)" },
      },
      spin: {
        to: { transform: "rotate(360deg)" },
      },
      pulse: {
        "0%, 100%": { backgroundColor: "transparent" },
        "50%": { backgroundColor: "#cbd5e1" },
      },
    },
    animation: {
      fadeIn: "fadeIn 0.5s",
      spin: "spin 1s linear infinite",
      pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
  plugins: [],
};
export default config;
