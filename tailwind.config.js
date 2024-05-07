/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    applyComplexClasses: true,
  },
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      height: {
        'screen-4rem': 'calc(100vh - 3.5rem)',
      },
      colors: {
        'brand-chat-bg':'rgb(233 231 222)',
        'brand-cream': '#F3F1E7', // Replace with your exact yellow color code
        'brand-gray': '#333333', // Replace with your exact blue color code
        'brand-brown': '#5C4033', // Replace with your exact green color code
        'brand-red': '#C44536',
        'brand-charcoal': '#4A4A4A',
        'brand-green': '#B8C4B8',
        'brand-deep-green': '#2F4F4F'
      },
      fontFamily: {
        body: ['"Your Custom Font"', 'sans-serif'], // Replace with your actual font family
      },
    },
  },
  plugins: [],
}
