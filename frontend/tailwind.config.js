/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  animation: {
    in: "animate-in 1s ease-out",
  },
  plugins: [],
};
