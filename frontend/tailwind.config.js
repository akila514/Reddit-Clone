/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screens, default starting point for mobile
        md: "768px", // Medium screens, default starting point for tablets
        lg: "1024px", // Large screens, default starting point for desktops
        xl: "1280px", // Extra large screens, default starting point for larger desktops
      },
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
