import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "var(--font-geist-sans)"],
        sora: ["var(--font-sora)"],
      },
      textShadow: {
        DEFAULT: "5px 0px 3px rgba(0,0,0,0.3)",
        clear: "5px 3px 3px rgba(0,0,0,0.3)",
        md: "3px 0px 2px rgba(0,0,0,0.2)",
        lg: "7px 0px 5px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [
    plugin(function ({matchUtilities, theme}) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        {values: theme("textShadow")}
      );
    }),
  ],
};

export default config;
