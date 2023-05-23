/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'gray-50': '#FAFAFA',
      'gray-100': '#F5F5F5',
      'gray-200': '#EEEEEE',
      'gray-300': '#E0E0E0',
      'gray-400': '#BDBDBD',
      'gray-500': '#9E9E9E',
      'gray-600': '#757575',
      'gray-700': '#616161',
      'gray-800': '#424242',
      'gray-900': '#212121',

      'blue-400': '#42a5f5',
      'blue-500': '#2196f3',
      'blue-600': '#1e88e5',

      'yellow-400': '#ffee58',
      'yellow-500': '#ffeb3b',
      'yellow-600': '#fdd835',

      'orange-400': '#ffa726',
      'orange-500': '#ff9800',
      'orange-600': '#fb8c00',

      'pink-400': '#ec407a',
      'pink-500': '#e91e63',
      'pink-600': '#d81b60',

      'purple-400': '#ab47bc',
      'purple-500': '#9c27b0',
      'purple-600': '#8e24aa',

      'red-400': '#ef5350',
      'red-500': '#f44336',
      'red-600': '#e53935',

      'green-400': '#66bb6a',
      'green-500': '#4caf50',
      'green-600': '#43a047',
    },
    // Roboto 100, 400, 700
    // Open-sans 400, 700
    fontFamily: {
      heading: ['Roboto', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    fontSize: {
      H1: '72px',
      H2: '48px',
      h3: '32px',
      h4: '24px',
      h5: '20px',
      H1Mobile: '48px',
      H2Mobile: '32px',
      h3Mobile: '24px',
      h4Mobile: '20px',
      h5Mobile: '16px',
      body: '16px',
      bodySmall: '14px',
    },
    lineHeight: {
      130: '130%',
      140: '140%',
      150: '150%',
    },
    letterSpacing: {
      zero: '0',
      minus: '-1%',
    },
    screens: {
      tablet: '769px',
      tabletEdgeCases: '1000px',
      desktop: '1201px',
      desktopEdgeCases: '1800px',
      xlDesktop: '2580px',
    },
    extend: {
      spacing: {
        8: '8px',
        12: '12px',
        16: '16x',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
        72: '72px',
        80: '80px',
        96: '96px',
        120: '120px',
      },
      boxShadow: {
        darkShadow: '0px 3px 8px 0px #212121',
        lightShadow: '0px 3px 8px 0px #E0E0E0',
      },
    },
  },
  plugins: [],
};
