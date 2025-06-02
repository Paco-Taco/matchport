/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#3498DB',
        accent: '#A3CB38',
        background: '#FFFFFF',
        neutral: '#ECF0F1',
      },
      fontFamily: {
        black: ['Poppins-Black', 'sans-serif'],
        blackItalic: ['Poppins-BlackItalic', 'sans-serif'],
        bold: ['Poppins-Bold', 'sans-serif'],
        boldItalic: ['Poppins-BoldItalic', 'sans-serif'],
        extraBold: ['Poppins-ExtraBold', 'sans-serif'],
        extraBoldItalic: ['Poppins-ExtraBoldItalic', 'sans-serif'],
        extraLight: ['Poppins-ExtraLight', 'sans-serif'],
        extraLightItalic: ['Poppins-ExtraLightItalic', 'sans-serif'],
        italic: ['Poppins-Italic', 'sans-serif'],
        light: ['Poppins-Light', 'sans-serif'],
        lightItalic: ['Poppins-LightItalic', 'sans-serif'],
        medium: ['Poppins-Medium', 'sans-serif'],
        mediumItalic: ['Poppins-MediumItalic', 'sans-serif'],
        regular: ['Poppins-Regular', 'sans-serif'],
        semiBold: ['Poppins-SemiBold', 'sans-serif'],
        semiBoldItalic: ['Poppins-SemiBoldItalic', 'sans-serif'],
        thin: ['Poppins-Thin', 'sans-serif'],
        thinItalic: ['Poppins-ThinItalic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
