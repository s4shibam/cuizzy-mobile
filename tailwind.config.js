/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import { colors } from './utils/colors'

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: colors
    }
  },
  plugins: [],
  corePlugin: {
    backgroundOpacity: true
  }
}
