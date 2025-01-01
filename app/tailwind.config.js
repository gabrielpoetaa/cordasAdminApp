/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: "minmax(18rem, 20rem) 1fr",
        form: "minmax(7.5rem, 17.5rem) minmax(25rem, 1fr) minmax(0, 15rem)",
      },
      maxWidth: {
        app: "700px",
      },
      colors: {
        goldCordas_50: "#f9f6ed",
        goldCordas_100: "#f1ead0",
        goldCordas_200: "#e5d3a3",
        goldCordas_300: "#d6b56e",
        goldCordas_400: "#c99b46",
        goldCordas_500: "#ba8638",
        goldCordas_600: "#a06a2e",
        goldCordas_700: "#804f28",
        goldCordas_800: "#6c4227",
        goldCordas_900: "#5d3826",
        goldCordas_950: "#351d13",

        blueCordas_50: "#f4f5fa",
        blueCordas_100: "#e5e6f4",
        blueCordas_200: "#d2d5eb",
        blueCordas_300: "#b3badd",
        blueCordas_400: "#8e97cc",
        blueCordas_500: "#7378be",
        blueCordas_600: "#6061b0",
        blueCordas_700: "#5955a0",
        blueCordas_800: "#4d4984",
        blueCordas_900: "#403e6a",
        blueCordas_950: "#2f2d48",

        blackCordas_50: "#f6f6f6",
        blackCordas_100: "#e7e7e7",
        blackCordas_200: "#d1d1d1",
        blackCordas_300: "#b0b0b0",
        blackCordas_400: "#888888",
        blackCordas_500: "#6d6d6d",
        blackCordas_600: "#5d5d5d",
        blackCordas_700: "#4f4f4f",
        blackCordas_800: "#454545",
        blackCordas_900: "#3d3d3d",
        blackCordas_950: "#000000",
      },
    },
  },
  plugins: [],
};
