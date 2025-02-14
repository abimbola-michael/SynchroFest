/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF00FF",
        "electric-blue": "#00FFFF",
        "neon-pink": "#FF00FF",
        "cyber-purple": "#8A2BE2",
        "lime-green": "#39FF14",
        "hot-red": "#FF073A",
        "amber-orange": "#FFBF00",
        "deep-sky-blue": "#00BFFF",
        "vivid-violet": "#9400D3",
        "laser-yellow": "#FFFF00",
        "glowing-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
