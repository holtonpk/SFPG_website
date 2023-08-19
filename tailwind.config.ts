import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        head: ["Playfair Display", ...defaultTheme.fontFamily.sans],
        body: ["Nunito", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        background1: "#FCFBF5",
        theme1: "#4DA4E0",
        theme2: "#EE217F",
        theme3: "#8E6CB6",
        theme4: "#FFBD59",
        // theme1: "#293288",
        // theme2: "#26C0FB",
        // theme3: "#F6AA3F",
        // theme4: "#51C270",
      },
    },
  },
  plugins: [],
};
export default config;
