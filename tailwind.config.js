/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ["./src/*.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
      extend: {},
      fontFamily:{
        "poppins":"Poppins",
        "amira" : "Amiri Quran"
      }
    },
    variants: {
    extend: {},
    },
    plugins: [
      require("daisyui"),
      require("tailwind-scrollbar")({nocompatible:true})
    ],
};
  
  