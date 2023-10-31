/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ["./src/**/*.{html,js}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {},
		fontFamily:{
			"poppins":"Poppins",
			"Amiri_Quran" : "Amiri Quran"
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
  
  