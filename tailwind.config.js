/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				lightPurple: '#cbb6e5',
				purple: '#761be4',
				darkPurple: '#6a19cd',
				rose: '#feecec',
				red: '#ed4545',
				lightWhite: '#f0eaf8',
				darkBlue: '#000853',
				gray: '#898da9'
      
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/forms')],
};
