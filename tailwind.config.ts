import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },

    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      "2xl": "1600px"
    },
  },
  plugins: [],
} satisfies Config;
